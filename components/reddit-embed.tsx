import React, { useEffect } from 'react';

export default function RedditEmbed({
  htmlString,
  className,
}: {
  htmlString: string;
  className: string;
}) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.reddit.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className={className}
      style={{ display: 'flex', width: '100%', height: '100%' }}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
}
