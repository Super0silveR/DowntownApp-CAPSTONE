import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc'; // Speedy Web Compiler (swc)

export default defineConfig(() => {
    return {
        build: {
            outDir: '../Api/wwwroot'
        },
        server: {
            port: 3000
        },
        plugins: [react()]
    }
});