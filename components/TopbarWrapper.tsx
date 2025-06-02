'use client';

import { useState } from 'react';
import Topbar from './Topbar';

export default function TopbarWrapper() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'Product' | 'Seller'>('Product');

  return (
    <Topbar
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      viewType={viewType}
      onViewTypeChange={setViewType}
    />
  );
} 