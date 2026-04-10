declare const _default: {
    content: string[];
    theme: {
        extend: {
            colors: {
                night: string;
                void: string;
                cosmic: string;
                gold: string;
                mist: string;
                ember: string;
            };
            fontFamily: {
                display: [string, string, string];
                body: [string, string, string];
            };
            boxShadow: {
                halo: string;
                card: string;
            };
            backgroundImage: {
                'cosmic-grid': string;
            };
            animation: {
                drift: string;
                glow: string;
                shimmer: string;
                rotateSlow: string;
            };
            keyframes: {
                drift: {
                    '0%, 100%': {
                        transform: string;
                    };
                    '50%': {
                        transform: string;
                    };
                };
                glow: {
                    '0%, 100%': {
                        opacity: string;
                        filter: string;
                    };
                    '50%': {
                        opacity: string;
                        filter: string;
                    };
                };
                shimmer: {
                    '0%': {
                        backgroundPosition: string;
                    };
                    '100%': {
                        backgroundPosition: string;
                    };
                };
                rotateSlow: {
                    '0%': {
                        transform: string;
                    };
                    '100%': {
                        transform: string;
                    };
                };
            };
        };
    };
    plugins: any[];
};
export default _default;
