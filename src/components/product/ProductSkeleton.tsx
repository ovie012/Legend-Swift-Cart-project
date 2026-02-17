const ProductSkeleton = () => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden">
    <div className="aspect-square bg-muted animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
      <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
      <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
    </div>
  </div>
);

export default ProductSkeleton;
