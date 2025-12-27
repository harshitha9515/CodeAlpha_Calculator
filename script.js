(function(){
  const exprEl = document.getElementById("expr");
  const resEl = document.getElementById("result");
  const keys = document.querySelectorAll(".key");
  const sciToggle = document.getElementById("sciToggle");
  const sciKeys = document.getElementById("sciKeys");
  const historyEl = document.getElementById("history");
  const clearHistoryBtn = document.getElementById("clearHistory");

  let expr = "";
  let result = "0";

  function update(){
    exprEl.textContent = expr || "\u00A0";
    resEl.textContent = result;
  }

  function compute(){
    try{
      const val = Function("return "+expr)();
      result = Number.isFinite(val) ? val : "Err";
    }catch{
      result = "Err";
    }
    update();
  }

  function applyFn(fn){
    try{
      const val = Function("return "+expr)();
      let r;
      switch(fn){
        case "sin": r=Math.sin(val); break;
        case "cos": r=Math.cos(val); break;
        case "tan": r=Math.tan(val); break;
        case "sqrt": r=Math.sqrt(val); break;
        case "log": r=Math.log10(val); break;
        case "ln": r=Math.log(val); break;
        case "square": r=val*val; break;
      }
      expr = String(r);
      compute();
    }catch{}
  }

  function addHistory(e,r){
    const item=document.createElement("div");
    item.className="hist-item";
    item.innerHTML=`<span>${e}</span><span>${r}</span>`;
    if(historyEl.querySelector(".hist-empty")) historyEl.innerHTML="";
    historyEl.prepend(item);
    localStorage.setItem("calcHistory",historyEl.innerHTML);
  }

  function loadHistory(){
    const h=localStorage.getItem("calcHistory");
    if(h) historyEl.innerHTML=h;
  }

  sciToggle.onclick=()=>{
    sciKeys.style.display = sciKeys.style.display==="grid" ? "none":"grid";
  };

  keys.forEach(k=>{
    k.onclick=()=>{
      const v=k.dataset.value;
      const a=k.dataset.action;
      const f=k.dataset.fn;

      if(a==="clear"){expr="";result="0";update();return;}
      if(a==="back"){expr=expr.slice(0,-1);compute();return;}
      if(a==="evaluate"){addHistory(expr,result);expr=result;update();return;}
      if(f){applyFn(f);return;}
      if(v){expr+=v;compute();}
    };
  });

  clearHistoryBtn.onclick=()=>{
    historyEl.innerHTML='<div class="hist-empty">No History Yet</div>';
    localStorage.removeItem("calcHistory");
  };

  loadHistory();
  update();
})();
