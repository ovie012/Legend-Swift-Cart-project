import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { fetchProductById } from '@/services/api';
import { useCartStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(id)
      .then((data) => { setProduct(data); setSelectedImage(0); })
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-2xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
            <div className="h-8 bg-muted rounded w-2/3 animate-pulse" />
            <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
            <div className="h-20 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft size={18} className="mr-2" /> Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-8 lg:gap-12"
      >
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
            <img
              src={product.images?.[selectedImage] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${
                    i === selectedImage ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-foreground mb-4">{product.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={18} fill="currentColor" />
              <span className="font-medium">{product.rating?.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground text-sm">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground mb-6">
            ${product.price?.toFixed(2)}
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button size="lg" onClick={handleAddToCart} className="w-full md:w-auto">
              <ShoppingCart size={18} className="mr-2" /> Add to Cart
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
