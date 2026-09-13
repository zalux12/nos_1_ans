(function(){
  const LIB_URL='https://cdn.jsdelivr.net/npm/libheif-js@1.23.2/libheif/libheif.js';
  let libPromise=null;
  function loadLib(){
    if(window.libheif) return Promise.resolve(window.libheif);
    if(libPromise) return libPromise;
    libPromise=new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=LIB_URL;
      s.async=true;
      s.onload=()=>window.libheif?resolve(window.libheif):reject(new Error('libheif_not_loaded'));
      s.onerror=()=>reject(new Error('libheif_load_failed'));
      document.head.appendChild(s);
    });
    return libPromise;
  }
  async function decodeHeic(blob,quality=.9){
    const lib=await loadLib();
    const bytes=new Uint8Array(await blob.arrayBuffer());
    const decoder=new lib.HeifDecoder();
    const images=decoder.decode(bytes);
    if(!images||!images.length) throw new Error('heic_decode_failed');
    const image=images[0];
    const w=image.get_width(),h=image.get_height();
    if(!w||!h) throw new Error('heic_invalid_dimensions');
    const data=new Uint8ClampedArray(w*h*4);
    await new Promise((resolve,reject)=>{
      image.display({data,width:w,height:h},displayData=>displayData?resolve(displayData):reject(new Error('heic_display_failed')));
    });
    const canvas=document.createElement('canvas');
    canvas.width=w;canvas.height=h;
    const ctx=canvas.getContext('2d');
    ctx.putImageData(new ImageData(data,w,h),0,0);
    return await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('jpeg_encode_failed')),'image/jpeg',quality));
  }
  window.heic2any=async function(opts){
    const blob=opts&&opts.blob;
    if(!(blob instanceof Blob)) throw new Error('invalid_blob');
    return decodeHeic(blob,typeof opts.quality==='number'?opts.quality:.9);
  };
})();