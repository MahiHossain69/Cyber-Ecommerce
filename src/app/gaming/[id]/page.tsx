import { GenericProductDetails } from "@/components/shared/generic-product-details";

export default async function GamingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <GenericProductDetails 
        productId={id} 
        category="gaming"
        apiPath="/api/gaming_api_17.json"
      />
    </main>
  );
}
