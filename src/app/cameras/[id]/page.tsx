import { GenericProductDetails } from "@/components/shared/generic-product-details";

export default async function CameraDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <GenericProductDetails 
        productId={id} 
        category="cameras"
        apiPath="/api/camera_api_45_real.json"
      />
    </main>
  );
}
