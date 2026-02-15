import { ProductDetails } from "@/components/scenes/smartphone/product-details";

export default async function SmartphoneDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <ProductDetails productId={id} />
    </main>
  );
}
