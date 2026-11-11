"use client";
import { FormEvent, useState } from "react";
import { z } from "zod";
type Kind="enquiry"|"strategy"|"application";
const serviceOptions=["Social Media Management","Instagram Marketing","Facebook & Instagram Ads","Reels & Short-Form Video","Creative Design & Content","Creative Design & Content Production","Influencer Marketing","Influencer Partnerships","Social Media Strategy","Analytics & Reporting","Analytics & Performance Reporting","Other"];
const emailSchema=z.email();
function validateLocal(kind:Kind,data:FormData){
 const values=Object.fromEntries(data.entries());
 const errors:Record<string,string>={};
 const required=["name","email","phone","message",...(kind==="application"?["position"]:["service"]),...(kind==="strategy"?["preferredAt","timezone"]:[])];
 for(const key of required){const value=String(values[key]||"").trim();if(!value)errors[key]="This field is required.";}
 if(String(values.website||""))errors.website="This form cannot accept automated submissions.";
 if(String(values.name||"").trim().length<2||String(values.name||"").trim().length>120)errors.name="Enter a name between 2 and 120 characters.";
 if(values.email&&!emailSchema.safeParse(String(values.email)).success)errors.email="Enter a valid email address.";
 if(values.phone&&!/^[+()0-9.\-\s]{7,30}$/.test(String(values.phone).trim()))errors.phone="Enter a valid phone number.";
 if(kind!=="application"&&values.service&&!serviceOptions.includes(String(values.service)))errors.service="Choose a service from the list.";
 if(String(values.company||"").length>160)errors.company="Keep the company name under 160 characters.";
 if(String(values.message||"").trim().length<10)errors.message="Enter at least 10 characters.";
 if(String(values.message||"").length>5000)errors.message="Keep your message under 5,000 characters.";
 if(kind==="strategy"){
  if(values.preferredAt&&!Number.isFinite(new Date(String(values.preferredAt)).getTime()))errors.preferredAt="Enter a valid preferred date and time.";
  if(String(values.timezone||"").length>80)errors.timezone="Keep the timezone under 80 characters.";
 }
 if(kind==="application"){
  const file=data.get("resume");
  if(!(file instanceof File)||file.size<1)errors.resume="Choose a resume file for this demo form.";
  else if(file.size>5*1024*1024)errors.resume="Choose a file smaller than 5 MB.";
  else if(!["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type))errors.resume="Choose a PDF, DOC or DOCX file.";
  if(values.portfolioUrl&&String(values.portfolioUrl).trim()&&!z.url().refine(value=>value.startsWith("https://")||value.startsWith("http://")).safeParse(String(values.portfolioUrl)).success)errors.portfolioUrl="Enter a valid HTTP or HTTPS portfolio URL.";
 }
 return errors;
}
export function Form({kind,source="contact",position=""}:{kind:Kind;source?:string;position?:string}){
 const [message,setMessage]=useState(""),[success,setSuccess]=useState(false),[fields,setFields]=useState<Record<string,string>>({}),[submitting,setSubmitting]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setMessage("");setFields({});const form=e.currentTarget;const data=new FormData(form);const errors=validateLocal(kind,data);setFields(errors);if(Object.keys(errors).length){setMessage("Please review the highlighted fields.");return}if(kind==="application"){setSuccess(true);form.reset();return}setSubmitting(true);try{const values=Object.fromEntries(data.entries());if(kind==="strategy"&&typeof values.preferredAt==="string")values.preferredAt=new Date(values.preferredAt).toISOString();const apiKind=kind==="strategy"?"strategy":"enquiry";const response=await fetch("/api/forms",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind:apiKind,data:{...values,source}})});const result=await response.json() as {ok?:boolean;message?:string;fields?:Record<string,string>};if(!response.ok||!result.ok){setFields(result.fields||{});setMessage(result.message||"We couldn’t send your message. Please try again.");return}setSuccess(true);form.reset()}catch{setMessage("We couldn’t reach the server. Please try again in a moment.")}finally{setSubmitting(false)}}
 if(success)return <p className="success-message" role="status">{kind==="application"?"Demo only: your application was validated locally but was not sent or saved. No information left this browser.":kind==="strategy"?"Thanks — your strategy call request has been received. We’ll be in touch.":"Thanks — your enquiry has been received. We’ll be in touch."}</p>;
 const error=(name:string)=>(fields[name]?<span className="field-error" id={`${name}-error`}>{fields[name]}</span>:null);
 const field=(name:string,label:string,type="text",required=true,placeholder="")=><div className="field"><label htmlFor={name}>{label}{required?" *":""}</label><input id={name} name={name} type={type} required={required} placeholder={placeholder} aria-invalid={!!fields[name]} aria-describedby={fields[name]?`${name}-error`:undefined}/>{error(name)}</div>;
 return <form onSubmit={submit} data-source={source} className="form-grid" noValidate>
   <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off"/></div>
   {field("name","Full name","text",true,"Your name")}{field("email","Email address","email",true,"you@company.com")}{field("phone","Phone number","tel",true,"+1 555 000 0000")}{kind!=="application"&&field("company","Company","text",false,"Your company")}
   {kind==="application"? <><div className="field"><label htmlFor="position">Position *</label><input id="position" name="position" required defaultValue={position} aria-invalid={!!fields.position}/>{error("position")}</div><div className="field"><label htmlFor="resume">Resume (PDF, DOC or DOCX; up to 5 MB) *</label><input id="resume" name="resume" type="file" required accept="application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" aria-invalid={!!fields.resume}/>{error("resume")}</div>{field("portfolioUrl","Portfolio URL","url",false,"https://")}</>:
   <><div className="field"><label htmlFor="service">{kind==="strategy"?"Service you’re interested in":"Service"} *</label><select id="service" name="service" required defaultValue="" aria-invalid={!!fields.service} aria-describedby={fields.service?"service-error":undefined}><option value="" disabled>Select a service</option>{serviceOptions.map(x=><option key={x}>{x}</option>)}</select>{error("service")}</div>{kind==="strategy"&&<>{field("preferredAt","Preferred date and time","datetime-local",true)}{field("timezone","Timezone","text",true,Intl.DateTimeFormat().resolvedOptions().timeZone||"Your timezone")}</>}</>}
   <div className="field full"><label htmlFor="message">{kind==="application"?"A little about yourself":"How can we help?"} *</label><textarea id="message" name="message" required minLength={10} maxLength={5000} placeholder={kind==="application"?"Tell us why this role interests you…":"Tell us about your goals and what you’re looking for…"} aria-invalid={!!fields.message} aria-describedby={fields.message?"message-error":undefined}/>{error("message")}</div>
   {message&&<p className="field-error form-message field full" role="alert">{message}</p>}<div className="field full"><button className="button" type="submit" disabled={submitting}>{submitting?"Sending…":kind==="application"?"Preview application":kind==="strategy"?"Request a strategy call":"Send enquiry"}</button><small className="form-note">{kind==="application"?"Demo form only: validation runs in this browser. Applications are not sent or saved.":"Your message is sent securely to our team and is used only to respond to your enquiry."}</small></div>
 </form>
}
