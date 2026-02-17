import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchProducts, searchProducts, fetchProductsByCategory, fetchCategories } from '@/services/api';
import ProductCard from '@/components/product/ProductCard';
import ProductSkeleton from '@/components/product/ProductSkeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LIMIT = 12;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 400);

  const page = parseInt(searchParams.get('page') || '1');
  const category = searchParams.get('category') || '';
  const skip = (page - 1) * LIMIT;

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        let data;
        if (debouncedSearch) {
          data = await searchProducts(debouncedSearch, LIMIT, skip);
        } else if (category) {
          data = await fetchProductsByCategory(category, LIMIT, skip);
        } else {
          data = await fetchProducts(LIMIT, skip);
        }
        setProducts(data.products);
        setTotal(data.total);
      } catch {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [debouncedSearch, category, skip]);

  const totalPages = Math.ceil(total / LIMIT);

  const setPage = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(p));
    setSearchParams(params);
  };

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams();
    if (cat) params.set('category', cat);
    params.set('page', '1');
    setSearchParams(params);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-foreground mb-8">Products</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                const params = new URLSearchParams();
                params.set('page', '1');
                setSearchParams(params);
              }}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!category ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange('')}
            >
              All
            </Button>
            {categories.slice(0, 8).map((cat: any) => (
              <Button
                key={cat.slug}
                variant={category === cat.slug ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(cat.slug)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        )}

        {!error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: LIMIT }).map((_, i) => <ProductSkeleton key={i} />)
              : products.map((p) => (
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
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-sm text-muted-foreground px-4">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Products;
