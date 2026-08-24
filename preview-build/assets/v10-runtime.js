(()=>{
  const getBaseSrc=frame=>frame.dataset.v10Src||frame.dataset.src||"";
  const buildSrc=frame=>{
    const base=getBaseSrc(frame);
    if(!frame.hasAttribute("data-random-start"))return base;
    const max=Math.max(60,Number(frame.dataset.randomMax||600));
    const start=Math.floor(60+Math.random()*Math.max(1,max-60));
    const joiner=base.includes("?")?"&":"?";
    return `${base}${joiner}autoplay=1&mute=1&start=${start}`;
  };

  document.querySelectorAll("[data-v10-carousel]").forEach(carousel=>{
    const slides=[...carousel.querySelectorAll("[data-v10-slide]")];
    if(!slides.length)return;

    let index=Math.max(0,slides.findIndex(slide=>slide.classList.contains("is-active")));
    let visible=false;

    const loadActiveFrames=()=>{
      const active=slides[index];
      active.querySelectorAll("iframe[data-src],iframe[data-v10-src]").forEach(frame=>{
        if(!frame.getAttribute("src"))frame.setAttribute("src",buildSrc(frame));
      });
    };

    const show=next=>{
      index=(next+slides.length)%slides.length;
      slides.forEach((slide,i)=>{
        const active=i===index;
        slide.classList.toggle("is-active",active);
        slide.hidden=!active;
        slide.querySelectorAll("iframe[data-random-start]").forEach(frame=>{
          if(!active)frame.removeAttribute("src");
        });
      });
      if(visible)loadActiveFrames();
    };

    carousel.querySelector("[data-prev]")?.addEventListener("click",()=>show(index-1));
    carousel.querySelector("[data-next]")?.addEventListener("click",()=>show(index+1));
    show(index);

    if("IntersectionObserver" in window){
      const observer=new IntersectionObserver(entries=>{
        if(entries.some(entry=>entry.isIntersecting)){
          visible=true;
          loadActiveFrames();
          observer.disconnect();
        }
      },{threshold:.12,rootMargin:"0px"});
      observer.observe(carousel);
    }else{
      visible=true;
      loadActiveFrames();
    }
  });
})();
