
import { clients, images } from "./data/clients.js";
const q=s=>document.querySelector(s);
const qa=s=>Array.from(document.querySelectorAll(s));

window.showTab=function(id,btn){
  qa(".panel").forEach(p=>p.classList.remove("active"));
  q("#"+id).classList.add("active");
  qa(".nav button").forEach(b=>b.classList.remove("active"));
  if(btn) btn.classList.add("active");
};
window.showSub=function(id,btn){
  qa(".subpanel").forEach(p=>p.classList.remove("active"));
  q("#"+id).classList.add("active");
  qa(".subnav button").forEach(b=>b.classList.remove("active"));
  if(btn) btn.classList.add("active");
};
function photo(url,label){return `<div class="realPhoto" style="background-image:url('${url}')"><span>${label}</span></div>`}
function render(){
  q("#priority").innerHTML=clients.slice(0,3).map(c=>`<div class="row" onclick="openClient(${clients.indexOf(c)})" style="cursor:pointer"><img class="avatar" src="${c.photo}"><div><strong>${c.name}</strong><small>${c.brief}</small></div><span class="severity ${c.status==='High'?'high':'medium'}">${c.status}</span></div>`).join("");
  q("#overviewRows").innerHTML=clients.map(c=>`<tr><td><div class="clientCell"><img class="avatar" src="${c.photo}"><span>${c.name}</span></div></td><td>${c.program}</td><td><span class="${parseInt(c.adherence)<75?'medium':'green'}">${c.adherence}</span></td><td><span class="${c.checkin==='Overdue'?'high':''}">${c.checkin}</span></td><td><button class="openBtn" onclick="openClient(${clients.indexOf(c)})">Open</button></td></tr>`).join("");
  q("#feed").innerHTML=`<div class="feedLine"><img class="avatar" src="${clients[1].photo}"><div><strong>Sarah Mitchell:</strong> Uploaded progress photo. Great job on consistency!</div><span>10m ago</span></div><div class="feedLine"><img class="avatar" src="${clients[0].photo}"><div><strong>John Smith:</strong> Reported low sleep and high stress.</div><span>25m ago</span></div><div class="feedLine"><img class="avatar" src="${images.ai}"><div><strong>AI Coach:</strong> Flagged nutrition adherence drop for Sarah M.</div><span>1h ago</span></div><a style="color:#55a8ff;font-size:13px;margin-top:10px;display:inline-block">View all messages</a>`;
  q("#uploads").innerHTML=[photo(images.uploads[0],"Progress Photo<br><small>John Smith · 2h ago</small>"),photo(images.uploads[1],"Transformation<br><small>Mike Johnson · 5h ago</small>"),photo(images.uploads[2],"Meal Photo<br><small>Sarah Mitchell · 1d ago</small>"),photo(images.uploads[3],"Bloodwork<br><small>Alex Rivera · 1d ago</small>")].join("");
  q("#clientCards").innerHTML=clients.map((c,i)=>`<div class="card clientCard" onclick="openClient(${i})"><div class="clientHead"><img class="avatar" src="${c.photo}"><div><strong>${c.name}</strong><br><small class="muted">${c.goal} · ${c.pay}</small></div></div><div class="progress ${c.color==='red'?'risk':c.color==='yellow'?'warn':''}"><span style="width:${c.momentum}%"></span></div><span class="pill ${c.color}">${c.status}</span></div>`).join("");
  openClient(1,false);
}
window.openClient=function(i,go=true){
  const c=clients[i];
  q("#pAvatar").src=c.photo;q("#pName").textContent=c.name;q("#pMeta").textContent=`${c.week} · ${c.goal} · ${c.pay}`;
  q("#pStatus").className=`pill ${c.color}`;q("#pStatus").textContent=c.status;
  q("#pBrief").textContent=c.brief;
  q("#pStats").innerHTML=`<div class="card metric"><div class="label">Payment</div><div class="metricNum">${c.pay.replace("/mo","")}</div></div><div class="card metric"><div class="label">Sleep</div><div class="metricNum">${c.sleep}</div></div><div class="card metric"><div class="label">Nutrition</div><div class="metricNum">${c.nutrition}</div></div><div class="card metric"><div class="label">Momentum</div><div class="metricNum">${c.momentum}</div></div>`;
  q("#pActions").innerHTML=c.actions.map(a=>`<div class="row"><span>✦</span><div><strong>${a}</strong><small>Recommended trainer action.</small></div><span class="pill green">Action</span></div>`).join("");
  q("#pQuestions").innerHTML=c.questionnaire.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("");
  q("#pSlack").innerHTML=`<div class="phoneTop"><strong>Slack</strong><span>${c.name}</span></div><div class="phoneTitle">#${c.name.toLowerCase().replaceAll(" ","-")}-client-log</div>`+c.slack.map(m=>`<div class="chat"><img class="avatar small" src="${m[0]==='ai'?images.ai:c.photo}"><div class="bubble ${m[0]==='ai'?'ai':''}">${m[1]}</div></div>`).join("");
  q("#pReminders").innerHTML=c.reminders.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join("");
  q("#pNutrition").innerHTML=c.nutritionRows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("");
  q("#pWorkouts").innerHTML=c.workouts.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join("");
  q("#pUploads").innerHTML=[photo(images.progress[0],"Before"),photo(images.progress[1],"Midpoint"),photo(images.progress[2],"Current"),photo(images.meals[0],"Breakfast"),photo(images.meals[1],"Lunch"),photo(images.docs[1],"Bloodwork")].join("");
  if(go) showTab("clientsPanel",qa(".nav button")[1]);
};
document.addEventListener("DOMContentLoaded", render);
