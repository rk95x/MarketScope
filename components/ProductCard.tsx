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
      className="flex items-center space-x-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-[#111827] truncate">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500">{product.sellerUsername}</p>
      </div>
      
      <div className="flex items-center space-x-8">
        <div className="text-right">
          <p className="text-sm font-medium text-[#111827]">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">Price</p>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-medium text-[#111827]">
            {product.salesLast30Days}
          </p>
          <p className="text-xs text-gray-500">Sales (30d)</p>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-medium text-[#10B981]">
            ${(product.price * product.salesLast30Days).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">Revenue</p>
        </div>
      </div>
    </div>
  );
} 