dataSource:"db:/ma_anagrafiche/ditte_presenzesw",
extendsID:"3C076162-6D45-4034-9F27-2ADA00E4841B",
items:[
{
enabled:false,
location:"275,5",
name:"btn_confirm_categ",
onActionMethodID:"FEA5BAE2-2DFA-41AA-86F9-91204D20E53B",
rolloverCursor:12,
showClick:false,
size:"30,30",
styleClass:"btn_confirm_40",
transparent:true,
typeid:7,
uuid:"5E261381-6CDF-4F54-B34D-2A332E0AD0CB"
},
{
dataProviderID:"vCodCategoriaSW",
displayType:2,
editable:false,
location:"61,10",
size:"212,20",
typeid:4,
uuid:"81F8CAF5-1A71-4DCE-BA88-B30734354DFB",
valuelistID:"DE78592C-79C4-4082-995C-A71545F811F2"
},
{
enabled:false,
location:"305,5",
name:"btn_cancel_categ",
onActionMethodID:"74C47E5B-1EAA-46E2-88A5-63990AC2830D",
rolloverCursor:12,
showClick:false,
size:"30,30",
styleClass:"btn_cancel_40",
transparent:true,
typeid:7,
uuid:"9BD9AFBC-BDB1-4AE4-8663-3590EFDF38E8"
},
{
anchors:15,
items:[
{
containsFormID:"CA3FD609-9564-48A4-9DC6-6474C48A9DB9",
location:"215,185",
relationName:"ditte_presenzesw_to_ditte_presenzesw",
text:"agd_sw_tbl",
typeid:15,
uuid:"00AA8150-B995-4A0E-BC48-270F2A375EE2"
}
],
location:"0,40",
name:"tabs",
printable:false,
size:"610,435",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"D0D1ED44-E2A9-43AC-8435-924C8187E6A6"
},
{
location:"5,5",
name:"btn_edit_categ",
onActionMethodID:"5EFC2027-918D-413A-8F99-8E913C91EEC7",
rolloverCursor:12,
showClick:false,
size:"30,30",
styleClass:"btn_edit",
transparent:true,
typeid:7,
uuid:"D60274B3-65D6-40DE-B965-B991BA4D9285"
},
{
dataProviderID:"vChkCodCategoriaSW",
displayType:4,
horizontalAlignment:0,
location:"40,10",
name:"chk_categoria",
size:"20,20",
styleClass:"check",
transparent:true,
typeid:4,
uuid:"ECC90971-47CD-4E83-B05A-1892F678CFD7"
}
],
name:"agd_presenze_sw",
scrollbars:0,
size:"615,480",
styleName:"leaf_style",
typeid:3,
uuid:"428DD4A7-96E9-4FD5-AD3D-5BA6D52C2868"