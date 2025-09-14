import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailProduct } from "@/services/product.service";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Star,
  Plus,
  Minus,
  Truck,
  Shield,
  RefreshCw,
  Check
} from 'lucide-react';

const DetailProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    setLoading(true);
    getDetailProduct(id, (data) => {
      // Transform data to match our component structure
      const transformedProduct = {
        ...data,
        images: [data.image], // Fake Store API only provides one image
        colors: ['Default'], // Fake Store API doesn't have colors
        sizes: ['One Size'], // Fake Store API doesn't have sizes
        stock: Math.floor(Math.random() * 20) + 5, // Random stock between 5-25
        reviews: Math.floor(Math.random() * 200) + 50, // Random reviews
        brand: data.category?.charAt(0).toUpperCase() + data.category?.slice(1),
        sku: `FSA-${data.id}`,
        originalPrice: data.price * 1.2, // Create original price for discount effect
        discount: 17
      };
      
      setProduct(transformedProduct);
      setSelectedColor('Default');
      setSelectedSize('One Size');
      setLoading(false);
    });
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < product?.stock) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (!product || !product.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">Maaf, produk yang Anda cari tidak dapat ditemukan.</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:text-red-500 hover:bg-gray-100'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
            
            {/* Image Thumbnails - Only show if multiple images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <span className="capitalize">{product.category}</span>
                {product.brand && (
                  <>
                    <span>•</span>
                    <span>{product.brand}</span>
                  </>
                )}
                <span>•</span>
                <span>ID: #{product.id}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating?.rate || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating?.rate || 'N/A'} ({product.rating?.count || product.reviews || 0} ulasan)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color Selection - Only show if more than one color */}
            {product.colors && product.colors.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Pilih Warna</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Jumlah</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    className="p-2 hover:bg-gray-100 transition-colors cursor-pointer"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className="p-2 hover:bg-gray-100 transition-colors cursor-pointer"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  Stok tersedia: {product.stock}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer">
              <ShoppingCart className="h-5 w-5" />
              <span>Tambah ke Keranjang</span>
            </button>

            {/* Services */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Gratis Ongkir</p>
                  <p className="text-xs text-gray-600">Min. pembelian $50</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Garansi 1 Tahun</p>
                  <p className="text-xs text-gray-600">Resmi dari brand</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <RefreshCw className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Bisa Retur</p>
                  <p className="text-xs text-gray-600">30 hari retur</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Deskripsi Produk</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Spesifikasi</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Kategori</span>
                <span className="font-semibold capitalize">{product.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Rating</span>
                <span className="font-semibold">{product.rating?.rate || 'N/A'}/5</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Reviews</span>
                <span className="font-semibold">{product.rating?.count || product.reviews}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Product ID</span>
                <span className="font-semibold">#{product.id}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold">{formatPrice(product.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;