const cursorDot=document.querySelector('.cursor-dot');
const cursorRing=document.querySelector('.cursor-ring');
if(window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('mousemove',e=>{
    cursorDot.style.left=e.clientX+'px';cursorDot.style.top=e.clientY+'px';
    cursorRing.style.left=e.clientX+'px';cursorRing.style.top=e.clientY+'px';
  });
  document.querySelectorAll('a,button,.card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cursorRing.style.width='58px';cursorRing.style.height='58px'});
    el.addEventListener('mouseleave',()=>{cursorRing.style.width='38px';cursorRing.style.height='38px'});
  });
}

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.12;
    const y=(e.clientY-r.top-r.height/2)*.12;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

const filters=document.querySelectorAll('.filter');
const cards=document.querySelectorAll('.card');
filters.forEach(button=>{
  button.addEventListener('click',()=>{
    filters.forEach(b=>b.classList.remove('active'));
    button.classList.add('active');
    const filter=button.dataset.filter;
    cards.forEach(card=>{
      const show=filter==='all'||card.dataset.category===filter;
      card.classList.toggle('hidden',!show);
    });
  });
});

const hero=document.querySelector('.hero-image');
window.addEventListener('scroll',()=>{
  if(hero && window.innerWidth>850){
    const y=Math.min(window.scrollY*.08,40);
    hero.style.transform=`translateY(${y}px) scale(1.02)`;
  }
});
