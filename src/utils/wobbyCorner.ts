// wobbyCorner.ts
// Converted from public/js/wobby-corner.js
// Provides a simple wobbly blob animation attached to a DOM element.

export interface WobbyCornerHandle {
    destroy: () => void;
}

export function initWobbyCorner(container: HTMLElement): WobbyCornerHandle {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('2D canvas context not available');
    }
    // alias to non-nullable variable for use in inner functions
    const context: CanvasRenderingContext2D = ctx;

    // Make canvas overlay the container
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '100';

    container.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }

    resizeCanvas();

    class Blob {
        wobbleIncrement = 0;
        radius = 0;
        segments = 12;
        step = Math.PI / 2 / this.segments;
        anchors: number[] = [];
        radii: number[] = [];
        thetaOff: number[] = [];

        private theta = 0;
        private thetaRamp = 0;
        private thetaRampDest = 12;
        private rampDamp = 25;

        constructor() {
            const bumpRadius = 100;
            const halfBumpRadius = bumpRadius / 2;

            for (let i = 0; i < this.segments + 2; i++) {
                this.anchors.push(0, 0);
                this.radii.push(Math.random() * bumpRadius - halfBumpRadius);
                this.thetaOff.push(Math.random() * 2 * Math.PI);
            }
        }

        update() {
            this.thetaRamp += (this.thetaRampDest - this.thetaRamp) / this.rampDamp;
            this.theta += 0.03;

            // rebuild anchors
            this.anchors = [0, this.radius];
            for (let i = 0; i <= this.segments + 2; i++) {
                const sine = Math.sin(this.thetaOff[i] + this.theta + this.thetaRamp);
                const rad = this.radius + this.radii[i] * sine;
                const x = rad * Math.sin(this.step * i);
                const y = rad * Math.cos(this.step * i);
                this.anchors.push(x, y);
            }

            context.save();
            context.translate(-10, -10);
            context.scale(0.5, 0.5);
            context.fillStyle = 'rgba(20, 20, 30)';
            context.beginPath();
            context.moveTo(0, 0);
            bezierSkin(this.anchors, false);

            context.lineTo(0, 0);
            context.fill();
            context.restore();
        }
    }

    // helper routines copied from original script, kept inside initWobbyCorner so they can use `ctx`
    function bezierSkin(bez: number[], closed = true) {
        const avg = calcAvgs(bez);
        const leng = bez.length;

        if (closed) {
            context.moveTo(avg[0], avg[1]);
            for (let i = 2; i < leng; i += 2) {
                const n = i + 1;
                context.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
            }
            context.quadraticCurveTo(bez[0], bez[1], avg[0], avg[1]);
        } else {
            context.moveTo(bez[0], bez[1]);
            context.lineTo(avg[0], avg[1]);
            for (let i = 2; i < leng - 2; i += 2) {
                const n = i + 1;
                context.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
            }
            context.lineTo(bez[leng - 2], bez[leng - 1]);
        }
    }

    function calcAvgs(p: number[]) {
        const avg: number[] = [];
        const leng = p.length;
        let prev: number;

        for (let i = 2; i < leng; i++) {
            prev = i - 2;
            avg.push((p[prev] + p[i]) / 2);
        }
        // close
        avg.push((p[0] + p[leng - 2]) / 2, (p[1] + p[leng - 1]) / 2);
        return avg;
    }

    const blob = new Blob();
    // expose for legacy scripts that reference window.blob
    (window as any).blob = blob;

    let animationId = 0;

    function loop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        blob.update();
        animationId = window.requestAnimationFrame(loop);
    }

    loop();

    function handleResize() {
        resizeCanvas();
    }

    container.addEventListener('resize', handleResize);

    function destroy() {
        window.cancelAnimationFrame(animationId);
        container.removeEventListener('resize', handleResize);
        if ((window as any).blob === blob) {
            delete (window as any).blob;
        }
        if (container.contains(canvas)) {
            container.removeChild(canvas);
        }
    }

    return { destroy };
}