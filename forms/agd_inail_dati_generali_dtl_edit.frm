dataSource:"db:/ma_anagrafiche/ditte_inailgenerale",
extendsID:"3C076162-6D45-4034-9F27-2ADA00E4841B",
items:[
{
labelFor:"fld_descrizione",
location:"240,10",
mediaOptions:14,
name:"lbl_descrizione",
size:"60,10",
text:"Descrizione",
toolTipText:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.label_1073742068.toolTipText",
transparent:true,
typeid:7,
uuid:"0C20150A-56E3-43A5-BEB9-12CCC0286E53"
},
{
labelFor:"fld_codsedeinail",
location:"170,10",
mediaOptions:14,
name:"lbl_codsedeinail",
size:"60,10",
text:"Sede INAIL",
toolTipText:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.label_1073742068.toolTipText",
transparent:true,
typeid:7,
uuid:"12EBC9F6-3A57-4A7C-ACEC-DA80DE4CE06C"
},
{
extendsID:"AAAC08F8-0270-4E48-995F-E7066E036521",
height:83,
typeid:19,
uuid:"1F513612-A7D6-46AB-952A-6790B319AA26"
},
{
customProperties:"methods:{\
onActionMethodID:{\
arguments:[\
null,\
null,\
\"'LEAF_Lkp_Sediinail'\",\
\"'AggiornaSedeInail'\"\
]\
}\
}",
formIndex:1,
horizontalAlignment:0,
labelFor:"fld_codsedeinail",
location:"210,25",
mediaOptions:2,
name:"btn_codsedeinail",
onActionMethodID:"09683411-0331-4A08-BF5E-656611194522",
onDoubleClickMethodID:"-1",
onRightClickMethodID:"-1",
rolloverCursor:12,
showClick:false,
size:"20,20",
styleClass:"btn_lookup",
transparent:true,
typeid:7,
uuid:"3BD9A3C3-F73B-4D8E-8B78-732496AAB359",
verticalAlignment:0
},
{
dataProviderID:"_descSedeInail",
editable:false,
location:"240,25",
name:"fld_descrizione",
size:"360,20",
text:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.descrizione.text",
toolTipText:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.descrizione.toolTipText",
typeid:4,
uuid:"551463DC-3A91-477D-B2A9-D2336BE1622F"
},
{
labelFor:"fld_codinailditta",
location:"10,10",
mediaOptions:14,
name:"lbl_codinailditta",
size:"100,10",
text:"Codice INAIL",
toolTipText:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.label_1073741843.toolTipText",
transparent:true,
typeid:7,
uuid:"6F42AECC-6F2B-4EB3-B51E-665BAB7A36A7"
},
{
anchors:6,
location:"546,50",
mediaOptions:2,
name:"btn_conferma_richiesta",
onActionMethodID:"B79B60D8-F63B-41C7-A6B8-4DBB69AB7C73",
onDoubleClickMethodID:"-1",
onRightClickMethodID:"-1",
rolloverCursor:12,
showClick:false,
size:"30,30",
styleClass:"btn_confirm_40",
toolTipText:"Conferma richiesta inserita",
transparent:true,
typeid:7,
uuid:"802D94C7-D24B-4881-BE3E-2FC9C1453491"
},
{
height:480,
partType:5,
typeid:19,
uuid:"834E3606-3376-4682-9051-D6F6B007B01D"
},
{
anchors:6,
location:"575,50",
mediaOptions:2,
mnemonic:"",
name:"btn_annulla_richiesta",
onActionMethodID:"CA09C9A5-298C-4A9D-AF8C-DB1525885C24",
onDoubleClickMethodID:"-1",
onRightClickMethodID:"-1",
rolloverCursor:12,
showClick:false,
size:"30,30",
styleClass:"btn_cancel_40",
toolTipText:"Annulla richiesta",
transparent:true,
typeid:7,
uuid:"8CBD8123-5C27-439E-878C-42F61E7357DD"
},
{
dataProviderID:"_codSedeInail",
editable:false,
location:"170,25",
name:"fld_codsedeinail",
size:"60,20",
text:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.sede_inail.text",
toolTipText:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.sede_inail.toolTipText",
typeid:4,
uuid:"ABB33E97-1596-450B-9BD7-B6E525FC76F7"
},
{
dataProviderID:"_controCodice",
horizontalAlignment:0,
location:"90,25",
name:"fld_controcodice",
size:"70,20",
text:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.contro_codice.text",
toolTipText:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.contro_codice.toolTipText",
typeid:4,
uuid:"B57172BF-7C60-430E-B587-B47CD15F12E4"
},
{
labelFor:"fld_controcodice",
location:"90,10",
mediaOptions:14,
name:"lbl_controcodice",
size:"80,10",
text:"Contro codice",
toolTipText:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.label_1073741843.toolTipText",
transparent:true,
typeid:7,
uuid:"D76373F2-D892-4BF3-AAB8-F41207365B29"
},
{
dataProviderID:"_codInailDitta",
horizontalAlignment:0,
location:"10,25",
name:"fld_codinailditta",
size:"70,20",
text:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.codice_inail_ditta.text",
toolTipText:"i18n:sampleuse_navigation.anagrafica_ditta_inail_tab.codice_inail_ditta.toolTipText",
typeid:4,
uuid:"DB7C281C-00D4-4AF9-857F-178A7A48183A"
}
],
name:"agd_inail_dati_generali_dtl_edit",
size:"610,480",
styleName:"leaf_style",
typeid:3,
uuid:"DA66E240-F443-43F3-B03A-62AA09AAF2DF"