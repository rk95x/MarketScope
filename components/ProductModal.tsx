import { MockListing } from '../mock/buyApiResults';
import Image from 'next/image';

interface ProductModalProps {
  product: MockListing;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold text-[#111827]">Product Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-64 w-full">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-[#111827]">{product.title}</h3>
                <p className="text-sm text-gray-500 mt-1">by {product.sellerUsername}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-lg font-semibold text-[#111827]">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Units Sold (30d)</p>
                  <p className="text-lg font-semibold text-[#111827]">
                    {product.salesLast30Days}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-lg font-semibold text-[#10B981]">
                    ${(product.price * product.salesLast30Days).toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Launch Date</p>
                  <p className="text-lg font-semibold text-[#111827]">
                    {new Date(product.soldDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <a
                  href={`https://www.ebay.com/itm/${product.itemId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View on eBay
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 