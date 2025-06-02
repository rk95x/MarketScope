import { MockListing } from '../mock/buyApiResults';
import Image from 'next/image';

interface ProductCardProps {
  product: MockListing;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
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
          <p className="text-sm text-gray-500 mt-1">
            Listed: {new Date(product.listedDate).toLocaleDateString()}
          </p>
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
            {product.quantity} units
          </p>
        </div>

        {/* Seller Column */}
        <div className="w-32">
          <p className="text-sm text-gray-600 truncate">
            {product.sellerUsername}
          </p>
        </div>

        {/* Sales Column */}
        <div className="w-24 text-right">
          <p className="text-sm font-medium text-[#111827]">
            {product.salesLast30Days} sold
          </p>
        </div>
      </div>
    </div>
  );
} 