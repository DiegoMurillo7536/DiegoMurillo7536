/**
 * 3D Background Manager
 * Renders a field of mouse-reactive 3D shapes (Three.js) fixed behind all page content.
 * Theme-aware: shape colors follow the cod-gray palette and react to dark mode changes.
 */

const Background3D = {
    canvas: null,
    renderer: null,
    scene: null,
    camera: null,
    group: null,
    shapes: [],
    mouse: { x: 0, y: 0 },
    targetRotation: { x: 0, y: 0 },
    animationId: null,
    themeObserver: null,
    initialized: false,

    init() {
        if (this.initialized) return;
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded, skipping 3D background');
            return;
        }
        this.initialized = true;

        this.createCanvas();
        try {
            this.createScene();
        } catch (error) {
            console.warn('WebGL not available, skipping 3D background');
            this.canvas.remove();
            this.initialized = false;
            return;
        }
        this.createShapes();
        this.setupMouseTracking();
        this.watchTheme();
        this.animate();

        window.addEventListener('resize', () => this.handleResize());
    },

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = 'position: fixed; inset: 0; z-index: -1; pointer-events: none;';
        document.body.prepend(this.canvas);
    },

    createScene() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        this.camera.position.z = 24;

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));

        const directional = new THREE.DirectionalLight(0xffffff, 1.1);
        directional.position.set(10, 20, 10);
        this.scene.add(directional);

        const point = new THREE.PointLight(0xffffff, 0.6);
        point.position.set(-15, -10, 12);
        this.scene.add(point);

        this.group = new THREE.Group();
        this.scene.add(this.group);
    },

    createShapes() {
        const material = new THREE.MeshStandardMaterial({
            color: this.getSphereColor(),
            metalness: 0.3,
            roughness: 0.4,
            transparent: true,
            opacity: 0.75,
            depthWrite: false
        });

        const count = window.innerWidth < 768 ? 40 : 60;

        for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(this.randomGeometry(), material);

            mesh.position.x = (Math.random() - 0.5) * 60;
            mesh.position.y = (Math.random() - 0.5) * 30;
            mesh.position.z = (Math.random() - 0.5) * 20;
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            mesh.baseY = mesh.position.y;
            mesh.spinSpeed = 0.001 + Math.random() * 0.004;
            mesh.floatOffset = Math.random() * Math.PI * 2;
            mesh.floatSpeed = 0.3 + Math.random() * 0.6;

            this.group.add(mesh);
            this.shapes.push(mesh);
        }
    },

    randomGeometry() {
        const size = 0.3 + Math.random() * 0.9;
        const options = [
            new THREE.SphereGeometry(size, 24, 24),
            new THREE.IcosahedronGeometry(size * 1.2, 0),
            new THREE.OctahedronGeometry(size * 1.2, 0),
            new THREE.DodecahedronGeometry(size * 1.2, 0),
            new THREE.BoxGeometry(size * 1.6, size * 1.6, size * 1.6),
            new THREE.TorusGeometry(size * 0.8, size * 0.35, 16, 24),
            new THREE.CylinderGeometry(size * 0.7, size * 0.7, size * 1.6, 16),
            new THREE.TorusKnotGeometry(size * 0.7, size * 0.22, 64, 8)
        ];
        return options[Math.floor(Math.random() * options.length)];
    },

    isDarkMode() {
        return document.documentElement.classList.contains('dark');
    },

    getSphereColor() {
        return this.isDarkMode() ? 0x6d6d6d : 0x888888;
    },

    setupMouseTracking() {
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
            this.targetRotation.y = this.mouse.x * 0.15;
            this.targetRotation.x = -this.mouse.y * 0.1;
        });
    },

    watchTheme() {
        this.themeObserver = new MutationObserver(() => this.applyTheme());
        this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    },

    applyTheme() {
        if (!this.group) return;
        const color = this.getSphereColor();
        this.group.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.color.set(color);
            }
        });
    },

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        const time = performance.now() * 0.001;

        this.group.rotation.y += (this.targetRotation.y - this.group.rotation.y) * 0.05;
        this.group.rotation.x += (this.targetRotation.x - this.group.rotation.x) * 0.05;

        this.shapes.forEach((mesh) => {
            mesh.rotation.x += mesh.spinSpeed;
            mesh.rotation.y += mesh.spinSpeed;
            mesh.rotation.z += mesh.spinSpeed * 0.5;
            mesh.position.y = mesh.baseY + Math.sin(time * mesh.floatSpeed + mesh.floatOffset) * 0.6;
        });

        this.renderer.render(this.scene, this.camera);
    },

    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
};
