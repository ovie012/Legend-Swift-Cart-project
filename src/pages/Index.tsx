import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fetchProducts, fetchCategories } from '@/services/api';
import ProductCard from '@/components/product/ProductCard';
import ProductSkeleton from '@/components/product/ProductSkeleton';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          fetchProducts(8, 0),
          fetchCategories(),
        ]);
        setProducts(prodData.products);
        setCategories(catData.slice(0, 6));
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-primary-foreground">
              Discover Premium Products
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/80">
              Curated collection of the finest products, delivered to your doorstep.
            </p>
            <Link to="/products">
              <Button variant="secondary" size="lg" className="group">
                Shop Now
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <Link to="/products" className="text-sm text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.map((p: any) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  thumbnail={p.thumbnail}
                  rating={p.rating}
                  category={p.category}
                />
              ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat: any) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow text-center"
              >
                <span className="font-medium text-foreground capitalize">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Shop?</h2>
          <p className="text-muted-foreground mb-8">
            Browse our entire collection and find what you love.
          </p>
          <Link to="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
