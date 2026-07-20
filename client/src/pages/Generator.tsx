import { useState, useRef, DragEvent } from 'react';
import { Upload, Trash2, Wand2, AlertCircle, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function Generator() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Form States
  const [projectName, setProjectName] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [userPrompt, setUserPrompt] = useState('');
  
  // Image States
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productPreview, setProductPreview] = useState<string>('');
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [modelPreview, setModelPreview] = useState<string>('');

  // Drag and Drop Hover States
  const [isDragProduct, setIsDragProduct] = useState(false);
  const [isDragModel, setIsDragModel] = useState(false);

  // Validation & Loading States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  // File Inputs Refs
  const productInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload and generation of local preview URLs
  const handleProductFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setProductImage(file);
      setProductPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, productImage: '' }));
    } else {
      setErrors((prev) => ({ ...prev, productImage: 'Please upload a valid image file.' }));
    }
  };

  const handleModelFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setModelImage(file);
      setModelPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, modelImage: '' }));
    } else {
      setErrors((prev) => ({ ...prev, modelImage: 'Please upload a valid image file.' }));
    }
  };

  // Product drag and drop events
  const handleProductDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragProduct(true);
  };

  const handleProductDragLeave = () => {
    setIsDragProduct(false);
  };

  const handleProductDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragProduct(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProductFile(e.dataTransfer.files[0]);
    }
  };

  // Model drag and drop events
  const handleModelDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragModel(true);
  };

  const handleModelDragLeave = () => {
    setIsDragModel(false);
  };

  const handleModelDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragModel(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleModelFile(e.dataTransfer.files[0]);
    }
  };

  // Remove uploaded image handlers
  const removeProductImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProductImage(null);
    if (productPreview) URL.revokeObjectURL(productPreview);
    setProductPreview('');
    if (productInputRef.current) productInputRef.current.value = '';
  };

  const removeModelImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModelImage(null);
    if (modelPreview) URL.revokeObjectURL(modelPreview);
    setModelPreview('');
    if (modelInputRef.current) modelInputRef.current.value = '';
  };

  // Form validation & submission simulation
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    if (!productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    if (!productImage) {
      newErrors.productImage = 'Product image is required';
    }
    if (!modelImage) {
      newErrors.modelImage = 'Model image is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setIsGenerating(true);

    // Navigate to loading screen with current state after a brief delay
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/loading', {
        state: {
          projectName,
          productName,
          productDescription,
          aspectRatio,
          userPrompt,
          productPreview,
          modelPreview,
        }
      });
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Orbs */}
      <div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(155,130,255,0.3), transparent)',
        }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,96,144,0.2), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4 animate-slide-up">
            <span className="text-gradient">Create In-Context Image</span>
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto animate-slide-up-delayed"
            style={{ color: isDark ? '#a8a6b8' : '#64627a' }}
          >
            Upload your model and product images to generate stunning UGC, short-form videos and social media posts
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Upload Box Stack */}
          <div className="lg:col-span-4 flex flex-col gap-6 animate-slide-up-delayed">
            
            {/* Product Image Upload Box */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold mb-2" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                Product Image <span className="text-rose-500">*</span>
              </span>
              <div
                onClick={() => productInputRef.current?.click()}
                onDragOver={handleProductDragOver}
                onDragLeave={handleProductDragLeave}
                onDrop={handleProductDrop}
                className="relative h-64 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer group"
                style={{
                  borderColor: errors.productImage
                    ? '#ff2d6f'
                    : isDragProduct
                    ? '#9b82ff'
                    : isDark
                    ? 'rgba(155, 130, 255, 0.25)'
                    : 'rgba(155, 130, 255, 0.4)',
                  background: isDragProduct
                    ? 'rgba(155, 130, 255, 0.08)'
                    : isDark
                    ? 'rgba(26, 26, 46, 0.6)'
                    : 'rgba(255, 255, 255, 0.7)',
                  boxShadow: isDragProduct ? '0 0 20px rgba(155, 130, 255, 0.15)' : 'none',
                }}
              >
                <input
                  type="file"
                  ref={productInputRef}
                  onChange={(e) => e.target.files?.[0] && handleProductFile(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />

                {productPreview ? (
                  <>
                    <img
                      src={productPreview}
                      alt="Product Preview"
                      className="absolute inset-0 w-full h-full object-contain p-2 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-2xl">
                      <button
                        type="button"
                        onClick={removeProductImage}
                        className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-transform hover:scale-110 shadow-lg cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                      style={{
                        background: isDark
                          ? 'rgba(155, 130, 255, 0.1)'
                          : 'rgba(155, 130, 255, 0.06)',
                        border: '1px solid rgba(155, 130, 255, 0.2)',
                      }}
                    >
                      <Upload size={22} style={{ color: isDark ? '#b4a4ff' : '#9b82ff' }} />
                    </div>
                    <p className="text-sm font-semibold mb-1" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                      Product Image
                    </p>
                    <p className="text-xs" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
                      Drag & drop or click to upload
                    </p>
                  </>
                )}
              </div>
              {errors.productImage && (
                <div className="flex items-center gap-1 mt-1.5 text-xs text-rose-500 font-medium">
                  <AlertCircle size={12} />
                  <span>{errors.productImage}</span>
                </div>
              )}
            </div>

            {/* Model Image Upload Box */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold mb-2" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                Model Image <span className="text-rose-500">*</span>
              </span>
              <div
                onClick={() => modelInputRef.current?.click()}
                onDragOver={handleModelDragOver}
                onDragLeave={handleModelDragLeave}
                onDrop={handleModelDrop}
                className="relative h-64 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer group"
                style={{
                  borderColor: errors.modelImage
                    ? '#ff2d6f'
                    : isDragModel
                    ? '#9b82ff'
                    : isDark
                    ? 'rgba(155, 130, 255, 0.25)'
                    : 'rgba(155, 130, 255, 0.4)',
                  background: isDragModel
                    ? 'rgba(155, 130, 255, 0.08)'
                    : isDark
                    ? 'rgba(26, 26, 46, 0.6)'
                    : 'rgba(255, 255, 255, 0.7)',
                  boxShadow: isDragModel ? '0 0 20px rgba(155, 130, 255, 0.15)' : 'none',
                }}
              >
                <input
                  type="file"
                  ref={modelInputRef}
                  onChange={(e) => e.target.files?.[0] && handleModelFile(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />

                {modelPreview ? (
                  <>
                    <img
                      src={modelPreview}
                      alt="Model Preview"
                      className="absolute inset-0 w-full h-full object-contain p-2 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-2xl">
                      <button
                        type="button"
                        onClick={removeModelImage}
                        className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-transform hover:scale-110 shadow-lg cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                      style={{
                        background: isDark
                          ? 'rgba(155, 130, 255, 0.1)'
                          : 'rgba(155, 130, 255, 0.06)',
                        border: '1px solid rgba(155, 130, 255, 0.2)',
                      }}
                    >
                      <Upload size={22} style={{ color: isDark ? '#b4a4ff' : '#9b82ff' }} />
                    </div>
                    <p className="text-sm font-semibold mb-1" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                      Mod Image
                    </p>
                    <p className="text-xs" style={{ color: isDark ? '#6e6c82' : '#9896a8' }}>
                      Drag & drop or click to upload
                    </p>
                  </>
                )}
              </div>
              {errors.modelImage && (
                <div className="flex items-center gap-1 mt-1.5 text-xs text-rose-500 font-medium">
                  <AlertCircle size={12} />
                  <span>{errors.modelImage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Settings Form Fields */}
          <div className="lg:col-span-8 flex flex-col gap-6 animate-slide-up-delayed-2">
            
            {/* Project Name Field */}
            <div className="flex flex-col">
              <label htmlFor="projectName" className="text-sm font-semibold mb-2" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                Project Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Name your project"
                className="w-full px-4 py-3.5 rounded-xl border transition-all duration-300 outline-none text-base focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent focus:ring-lavender-500"
                style={{
                  color: isDark ? '#e8e6f0' : '#1e1e2e',
                  borderColor: errors.projectName
                    ? '#ff2d6f'
                    : isDark
                    ? 'rgba(42, 42, 66, 0.8)'
                    : 'rgba(232, 230, 240, 0.8)',
                  background: isDark
                    ? 'rgba(26, 26, 46, 0.7)'
                    : 'rgba(255, 255, 255, 0.8)',
                }}
              />
              {errors.projectName && (
                <div className="flex items-center gap-1 mt-1.5 text-xs text-rose-500 font-medium">
                  <AlertCircle size={12} />
                  <span>{errors.projectName}</span>
                </div>
              )}
            </div>

            {/* Product Name Field */}
            <div className="flex flex-col">
              <label htmlFor="productName" className="text-sm font-semibold mb-2" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter the name of the product"
                className="w-full px-4 py-3.5 rounded-xl border transition-all duration-300 outline-none text-base focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent focus:ring-lavender-500"
                style={{
                  color: isDark ? '#e8e6f0' : '#1e1e2e',
                  borderColor: errors.productName
                    ? '#ff2d6f'
                    : isDark
                    ? 'rgba(42, 42, 66, 0.8)'
                    : 'rgba(232, 230, 240, 0.8)',
                  background: isDark
                    ? 'rgba(26, 26, 46, 0.7)'
                    : 'rgba(255, 255, 255, 0.8)',
                }}
              />
              {errors.productName && (
                <div className="flex items-center gap-1 mt-1.5 text-xs text-rose-500 font-medium">
                  <AlertCircle size={12} />
                  <span>{errors.productName}</span>
                </div>
              )}
            </div>

            {/* Product Description Field (Optional) */}
            <div className="flex flex-col">
              <label htmlFor="productDescription" className="text-sm font-semibold mb-2" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                Product Description <span className="text-xs font-normal" style={{ color: '#9b82ff' }}>(optional)</span>
              </label>
              <textarea
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter the description of the product"
                rows={4}
                className="w-full px-4 py-3.5 rounded-xl border transition-all duration-300 outline-none text-base resize-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent focus:ring-lavender-500"
                style={{
                  color: isDark ? '#e8e6f0' : '#1e1e2e',
                  borderColor: isDark ? 'rgba(42, 42, 66, 0.8)' : 'rgba(232, 230, 240, 0.8)',
                  background: isDark ? 'rgba(26, 26, 46, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                }}
              />
            </div>

            {/* Aspect Ratio Selector */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold mb-3" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                Aspect Ratio
              </span>
              <div className="flex items-center gap-4">
                {/* 9:16 Button */}
                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className="w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: aspectRatio === '9:16'
                      ? '#9b82ff'
                      : isDark
                      ? 'rgba(42, 42, 66, 0.8)'
                      : 'rgba(232, 230, 240, 0.8)',
                    background: aspectRatio === '9:16'
                      ? 'rgba(155, 130, 255, 0.15)'
                      : isDark
                      ? 'rgba(26, 26, 46, 0.4)'
                      : 'rgba(255, 255, 255, 0.5)',
                    boxShadow: aspectRatio === '9:16' ? '0 0 15px rgba(155, 130, 255, 0.2)' : 'none',
                  }}
                  title="Portrait (9:16)"
                >
                  <div
                    className="w-5 h-8 rounded border-2 transition-colors duration-300"
                    style={{
                      borderColor: aspectRatio === '9:16'
                        ? '#b4a4ff'
                        : isDark
                        ? '#6e6c82'
                        : '#9896a8',
                    }}
                  />
                </button>

                {/* 16:9 Button */}
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className="w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: aspectRatio === '16:9'
                      ? '#9b82ff'
                      : isDark
                      ? 'rgba(42, 42, 66, 0.8)'
                      : 'rgba(232, 230, 240, 0.8)',
                    background: aspectRatio === '16:9'
                      ? 'rgba(155, 130, 255, 0.15)'
                      : isDark
                      ? 'rgba(26, 26, 46, 0.4)'
                      : 'rgba(255, 255, 255, 0.5)',
                    boxShadow: aspectRatio === '16:9' ? '0 0 15px rgba(155, 130, 255, 0.2)' : 'none',
                  }}
                  title="Landscape (16:9)"
                >
                  <div
                    className="w-8 h-5 rounded border-2 transition-colors duration-300"
                    style={{
                      borderColor: aspectRatio === '16:9'
                        ? '#b4a4ff'
                        : isDark
                        ? '#6e6c82'
                        : '#9896a8',
                    }}
                  />
                </button>
              </div>
            </div>

            {/* User Prompt Field (Optional) */}
            <div className="flex flex-col">
              <label htmlFor="userPrompt" className="text-sm font-semibold mb-2" style={{ color: isDark ? '#e8e6f0' : '#1e1e2e' }}>
                User Prompt <span className="text-xs font-normal" style={{ color: '#9b82ff' }}>(optional)</span>
              </label>
              <textarea
                id="userPrompt"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Describe how you want the narration to be."
                rows={4}
                className="w-full px-4 py-3.5 rounded-xl border transition-all duration-300 outline-none text-base resize-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent focus:ring-lavender-500"
                style={{
                  color: isDark ? '#e8e6f0' : '#1e1e2e',
                  borderColor: isDark ? 'rgba(42, 42, 66, 0.8)' : 'rgba(232, 230, 240, 0.8)',
                  background: isDark ? 'rgba(26, 26, 46, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                }}
              />
            </div>

            {/* Generate Button container */}
            <div className="mt-4 flex flex-col items-stretch sm:items-start">
              <button
                type="submit"
                disabled={isGenerating}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #9b82ff, #7c52e3)',
                  boxShadow: '0 8px 32px -8px rgba(155, 130, 255, 0.5)',
                }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Generating Ad...
                  </>
                ) : (
                  <>
                    <Wand2 size={18} />
                    Generate UGC Ad
                  </>
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}