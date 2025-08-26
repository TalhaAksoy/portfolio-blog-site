import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
};

const withMDX = createMDX({
	extension : /\.(md|mdx)$/,
})

export default withMDX(nextConfig);
