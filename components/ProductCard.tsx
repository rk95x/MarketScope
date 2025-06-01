import { MockListing } from '../mock/buyApiResults';
import Image from 'next/image';

interface ProductCardProps {
  product: MockListing;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg"
    >
      {/* Product Image */}
      <div className="relative h-24 w-24 sm:h-16 sm:w-16 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <h3 className="text-base font-medium text-[#111827] line-clamp-2 mb-1">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 truncate">
          {product.sellerUsername}
        </p>
      </div>
      
      {/* Stats */}
      <div className="flex flex-wrap justify-end gap-4 sm:space-x-6 sm:space-y-0 sm:flex-shrink-0 sm:ml-auto">
        <div className="text-right">
          <p className="text-sm font-medium text-[#111827] whitespace-nowrap">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">Price</p>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-medium text-[#111827] whitespace-nowrap">
            {product.salesLast30Days}
          </p>
          <p className="text-xs text-gray-500">Sales (30d)</p>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-medium text-[#10B981] whitespace-nowrap">
            ${(product.price * product.salesLast30Days).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">Revenue</p>
        </div>
      </div>
    </div>
  );
} 