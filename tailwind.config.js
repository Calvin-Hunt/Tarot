export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                night: '#060816',
                void: '#0b1024',
                cosmic: '#11193a',
                gold: '#d4b06a',
                mist: '#9ca7d2',
                ember: '#f0d8a3',
            },
            fontFamily: {
                display: ['Georgia', 'Times New Roman', 'serif'],
                body: ['ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                halo: '0 0 30px rgba(212, 176, 106, 0.16)',
                card: '0 28px 60px rgba(4, 6, 18, 0.52)',
            },
            backgroundImage: {
                'cosmic-grid': 'radial-gradient(circle at center, rgba(212,176,106,0.08) 0, transparent 38%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            },
            animation: {
                drift: 'drift 16s ease-in-out infinite',
                glow: 'glow 4.8s ease-in-out infinite',
                shimmer: 'shimmer 2.8s linear infinite',
                rotateSlow: 'rotateSlow 24s linear infinite',
            },
            keyframes: {
                drift: {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
                    '50%': { transform: 'translate3d(0, -18px, 0)' },
                },
                glow: {
                    '0%, 100%': { opacity: '0.55', filter: 'blur(18px)' },
                    '50%': { opacity: '0.9', filter: 'blur(24px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                rotateSlow: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [],
};
