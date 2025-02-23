import { type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useAtomValue } from "jotai";

import Landing from "~/components/pages/landing";
import Recording from "~/components/pages/recording";
import Result from "~/components/pages/result";
import { pageAtom } from "~/constants";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { content: "Welcome to Remix!", name: "description" }];
};

export type ApiResponse = Record<string, number>;

export async function action({ request }: ActionFunctionArgs): Promise<Response> {
  const formData = await request.formData();
  const file = formData.get("request") as File | null;

  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  const uploadFormData = new FormData();
  uploadFormData.append("request", file);

  try {
    const response = await fetch("http://163.51.196.119/predict", {
      body: uploadFormData,
      method: "POST",
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { detail?: string };

      return Response.json(
        { error: errorData.detail ?? "Internal server error. Please try again later." },
        { status: response.status },
      );
    }
    const result = (await response.json()) as ApiResponse;
    return Response.json({ result });
  } catch {
    return Response.json({ error: "Failed to fetch from prediction server." }, { status: 500 });
  }
}

export default function Index() {
  const page = useAtomValue(pageAtom);

  switch (page) {
    case "landing": {
      return <Landing />;
    }
    case "recording": {
      return <Recording />;
    }
    case "result": {
      return <Result />;
    }
  }
}
