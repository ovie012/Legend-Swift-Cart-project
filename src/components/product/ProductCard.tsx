import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  category: string;
}

const ProductCard = ({ id, title, price, thumbnail, rating, category }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
  >
    <Link to={`/products/${id}`} className="group block">
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{category}</p>
          <h3 className="font-medium text-foreground text-sm line-clamp-1 mb-2">{title}</h3>
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground">${price.toFixed(2)}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={14} fill="currentColor" />
              <span className="text-xs text-muted-foreground">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ProductCard;
