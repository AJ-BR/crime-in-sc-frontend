import { useEffect } from 'react';

 const LoadScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.type = "text/javascript"

    document.body.appendChild(script);
    console.log("LOADING " +url)

    return () => {
      document.body.removeChild(script);
      console.log("REMOVING" +url)
    }
  }, [url]);
};

export default LoadScript;

