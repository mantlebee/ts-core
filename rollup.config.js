import path from "path";

import alias from "@rollup/plugin-alias";
import cleaner from "rollup-plugin-cleaner";
import typescript from '@rollup/plugin-typescript';

const outDir = "dist"

export default {
    input: 'src/index.ts',
    output: {
        dir: outDir,
        format: "es",
    },
    plugins: [
        cleaner({ targets: [outDir] }),
        alias({
            resolve: [".ts"],
            entries: { "@/": path.resolve(__dirname, "src/") }
        }),
        typescript()]
};