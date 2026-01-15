"use client";

/**
 * 這頁是用來渲染 Sanity Studio (後台介面) 的
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
