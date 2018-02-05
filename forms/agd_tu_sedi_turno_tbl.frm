dataSource:"db:/ma_anagrafiche/ditte_sediturni",
initialSort:"ditte_sediturni_to_ditte_turni.codice asc",
items:[
{
horizontalAlignment:0,
labelFor:"fld_codice",
location:"0,0",
name:"lbl_codice",
size:"50,20",
styleClass:"table_header",
text:"Codice",
typeid:7,
uuid:"1A06E541-9387-4F18-B1C5-BD0595F2CC3A"
},
{
imageMediaID:"A7B00B39-D19B-4478-9939-150AC43083FD",
location:"355,20",
name:"btn_delete",
onActionMethodID:"F8CD233A-5303-4CEC-AF94-B329433D21A7",
onDoubleClickMethodID:"-1",
onRightClickMethodID:"-1",
showClick:false,
size:"20,20",
styleClass:"table",
toolTipText:"Slega turno",
transparent:true,
typeid:7,
uuid:"21068FA0-BE69-4992-AA4C-BD75BF4BDA09"
},
{
dataProviderID:"ditte_sediturni_to_ditte_turni.descrizione",
editable:false,
format:"*********************************************",
location:"50,20",
name:"fld_descrizione",
size:"305,20",
styleClass:"table",
text:"Descrizione",
transparent:true,
typeid:4,
uuid:"32335D4B-707A-4A14-BAC3-7444C7920BD1"
},
{
height:40,
partType:5,
typeid:19,
uuid:"40EBCC10-1BD1-4DED-8788-B7C09239AE9A"
},
{
horizontalAlignment:4,
labelFor:"btn_delete",
location:"355,0",
name:"lbl_btndelete",
size:"20,20",
styleClass:"table_header",
typeid:7,
uuid:"6850B42B-DD48-40AD-90BF-98CAD7C5941E"
},
{
horizontalAlignment:0,
labelFor:"fld_descrizione",
location:"50,0",
name:"lbl_descrizione",
size:"305,20",
styleClass:"table_header",
text:"Descrizione",
typeid:7,
uuid:"B67D8F1B-B268-47A1-B347-CD7A60CF15F5"
},
{
dataProviderID:"ditte_sediturni_to_ditte_turni.codice",
editable:false,
horizontalAlignment:0,
location:"0,20",
name:"fld_codice",
size:"50,20",
styleClass:"table",
text:"Codice",
transparent:true,
typeid:4,
uuid:"EC3C083C-A8DB-4736-BFA8-BC003044F53E"
}
],
name:"agd_tu_sedi_turno_tbl",
navigatorID:"-1",
size:"375,40",
styleName:"leaf_style",
typeid:3,
uuid:"C2C6492F-4054-4665-9074-7E26B9FA7629",
view:3