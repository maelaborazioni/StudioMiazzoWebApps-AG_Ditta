dataSource:"db:/ma_anagrafiche/ditte_calendario",
extendsID:"-1",
items:[
{
customProperties:"methods:{\
onActionMethodID:{\
arguments:[\
null,\
null,\
\"'AG_Lkp_ClassiRateo'\",\
\"'AggiornaTipoRateo'\",\
\"'FiltraDitta'\",\
null,\
null,\
null,\
\"true\"\
]\
}\
}",
formIndex:1,
horizontalAlignment:0,
labelFor:"fld_descclasserateo",
location:"40,20",
mediaOptions:2,
name:"btn_descclasserateo",
onActionMethodID:"09683411-0331-4A08-BF5E-656611194522",
onDoubleClickMethodID:"-1",
onRightClickMethodID:"-1",
rolloverCursor:12,
showClick:false,
size:"20,20",
styleClass:"btn_lookup",
transparent:true,
typeid:7,
uuid:"3C637DF0-73B9-4F72-97BB-4E144923021C",
verticalAlignment:0
},
{
dataProviderID:"classerateo",
location:"0,20",
name:"fld_codclasserateo",
size:"40,20",
typeid:4,
uuid:"72345443-D26F-4739-B3AB-5E808FEB56EA"
},
{
dataProviderID:"ditte_calendario_to_e2rateiclassi.descrizione",
location:"60,20",
name:"fld_descclasserateo",
size:"250,20",
typeid:4,
uuid:"915D9FCD-9056-4B09-BC3F-25682D96DE18"
},
{
labelFor:"fld_codclasserateo",
location:"0,0",
name:"lbl_classerateo",
size:"80,20",
text:"Classe rateo",
transparent:true,
typeid:7,
uuid:"DDBE9CA6-E5C8-448A-B71D-E19C4716EBF7"
},
{
height:40,
partType:5,
typeid:19,
uuid:"EF462515-D9B7-4207-83F1-CE23C4F1C747"
}
],
name:"agd_pres_af_rateo",
navigatorID:"-1",
showInMenu:true,
size:"310,40",
styleName:"leaf_style",
transparent:true,
typeid:3,
uuid:"5E8CF70A-B72B-4A41-BF0A-94BBC536A15B"