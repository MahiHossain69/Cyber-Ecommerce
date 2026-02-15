import { GenericProductDetails } from "@/components/shared/generic-product-details";

export default async function HeadphoneDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <GenericProductDetails 
        productId={id} 
        category="headphones"
        apiPath="/api/headphone_api_30_real.json"
      />
    </main>
  );
}
