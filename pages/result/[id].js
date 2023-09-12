import React from "react";
import ResultComponent from "../../src/component/ResultComponent";
import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  const resId = router.query.id;
  return <ResultComponent resId={resId} />;
}
