import { MockListing } from '../mock/buyApiResults';
import Image from 'next/image';

interface ProductCardProps {
  product?: MockListing;
  onClick?: () => void;
  isHeader?: boolean;
}

export default function ProductCard({ product, onClick, isHeader = false }: ProductCardProps) {
  if (isHeader) {
    return (
      <div className="p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-600">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm">Title</p>
          </div>
          <div className="w-24">
            <p className="text-sm">Price</p>
          </div>
          <div className="w-24">
            <p className="text-sm">Quantity</p>
          </div>
          <div className="w-32">
            <p className="text-sm">Seller</p>
          </div>
          <div className="w-24 text-right">
            <p className="text-sm">Listed Date</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product || !onClick) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Title Column */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-[#111827] truncate">
            {product.title}
          </h3>
        </div>

        {/* Price Column */}
        <div className="w-24">
          <p className="text-sm font-medium text-[#111827]">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Quantity Column */}
        <div className="w-24">
          <p className="text-sm text-gray-600">
            {product.salesLast30Days} units
          </p>
        </div>

        {/* Seller Column */}
        <div className="w-32">
          <p className="text-sm text-gray-600 truncate">
            {product.sellerUsername}
          </p>
        </div>

        {/* Listed Date Column */}
        <div className="w-24 text-right">
          <p className="text-sm text-gray-600">
            {new Date(product.soldDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
} 