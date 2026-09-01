import typescript from "@rollup/plugin-typescript";

const outDir = "dist";

export default {
    input: "src/index.ts",
    output: {
        dir: outDir,
        format: "cjs",
        sourcemap: true,
    },
    plugins: [
        typescript({ tsconfig: "tsconfig.prod.json" })
    ]
};
