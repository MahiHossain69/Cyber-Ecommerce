import { GenericProductDetails } from "@/components/shared/generic-product-details";

export default async function ComputerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <GenericProductDetails 
        productId={id} 
        category="computers"
        apiPath="/api/laptop_api_15.json"
      />
    </main>
  );
}
