import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Loader } from 'lucide-react';

interface ListItem {
  id: string;
  content: React.ReactNode;
}

interface ProgressiveListProps {
  items: ListItem[];
  initialCount?: number;
  loadMoreCount?: number;
  showLoadMore?: boolean;
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  className?: string;
  itemClassName?: string;
  loadMoreText?: string;
  noMoreText?: string;
  emptyText?: string;
}

const ProgressiveList: React.FC<ProgressiveListProps> = ({
  items,
  initialCount = 5,
  loadMoreCount = 5,
  showLoadMore = true,
  loading = false,
  hasMore = true,
  onLoadMore,
  className = '',
  itemClassName = '',
  loadMoreText = 'Load More',
  noMoreText = 'No more items',
  emptyText = 'No items to display'
}) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll alternative
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-load when load more button is visible (optional progressive enhancement)
  useEffect(() => {
    if (isIntersecting && hasMore && !loading && onLoadMore) {
      const timer = setTimeout(() => {
        onLoadMore();
      }, 1000); // Delay to prevent aggressive loading

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, hasMore, loading, onLoadMore]);

  const handleLoadMore = useCallback(() => {
    if (onLoadMore) {
      onLoadMore();
    } else {
      setVisibleCount(prev => prev + loadMoreCount);
    }
  }, [onLoadMore, loadMoreCount]);

  // Keyboard navigation for load more button
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLoadMore();
    }
  };

  const visibleItems = onLoadMore ? items : items.slice(0, visibleCount);
  const canLoadMore = onLoadMore ? hasMore : visibleCount < items.length;

  if (items.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-400 ${className}`}>
        {emptyText}
      </div>
    );
  }

  return (
    <div className={className} ref={listRef}>
      {/* Screen reader announcement for dynamic content */}
      <div className="sr-only" aria-live="polite" aria-atomic="false">
        Showing {visibleItems.length} of {items.length} items
      </div>

      {/* Items list */}
      <div 
        role="list" 
        aria-label={`List of items, ${visibleItems.length} of ${items.length} shown`}
      >
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            role="listitem"
            className={`${itemClassName} ${index > 0 ? 'mt-4' : ''}`}
            tabIndex={0}
            aria-setsize={items.length}
            aria-posinset={index + 1}
          >
            {item.content}
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center py-6" role="status" aria-label="Loading more items">
          <Loader className="h-6 w-6 animate-spin text-blue-500 mr-2" />
          <span className="text-gray-400">Loading more items...</span>
        </div>
      )}

      {/* Load more button */}
      {!loading && canLoadMore && showLoadMore && (
        <div className="text-center mt-6">
          <button
            ref={loadMoreRef}
            onClick={handleLoadMore}
            onKeyDown={handleKeyDown}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-describedby="load-more-help"
          >
            <ChevronDown className="h-4 w-4" />
            {loadMoreText}
          </button>
          <div id="load-more-help" className="text-xs text-gray-500 mt-2">
            {onLoadMore 
              ? `${items.length - visibleItems.length} more items available`
              : `${Math.min(loadMoreCount, items.length - visibleItems.length)} more items will be shown`
            }
          </div>
        </div>
      )}

      {/* No more items message */}
      {!loading && !canLoadMore && items.length > initialCount && (
        <div className="text-center py-6 text-gray-400 text-sm">
          {noMoreText}
        </div>
      )}

      {/* Skip to end link for screen readers */}
      {visibleItems.length > 10 && (
        <div className="sr-only">
          <button
            onClick={() => {
              const lastItem = listRef.current?.querySelector('[role="listitem"]:last-child');
              if (lastItem) {
                (lastItem as HTMLElement).focus();
              }
            }}
            className="underline text-blue-400"
          >
            Skip to last item
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressiveList;