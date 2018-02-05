dataSource:"db:/ma_anagrafiche/ditte_indirizzi",
extendsID:"BBD6B921-E2BA-4EEC-ADFB-0933F14C2D6C",
items:[
{
extendsID:"AAAC08F8-0270-4E48-995F-E7066E036521",
height:190,
typeid:19,
uuid:"061AC73A-94C0-4BBF-BE61-F9BCB70E3226"
},
{
extendsID:"BA578401-3A04-44D7-8FB0-D3873BA90D1B",
location:"310,50",
typeid:7,
uuid:"0FB8F7B2-635D-4049-B0CD-EEC72B9A8028"
},
{
dataProviderID:"_provincia",
enabled:false,
extendsID:"585A3235-3C3C-47E5-A0F6-F04B9CC7DD4A",
location:"310,70",
typeid:4,
uuid:"15BEDD4D-C691-46B0-B962-392DA08C7326"
},
{
dataProviderID:"_cap",
enabled:false,
extendsID:"D7CAD8DA-A71D-4B8A-8025-91E0B81468ED",
location:"350,70",
typeid:4,
uuid:"430BCB89-BA35-479C-A68D-8E860965ACC3"
},
{
height:480,
partType:5,
typeid:19,
uuid:"4F2F66F7-EE96-4293-A09C-BA8D2D735CA2"
},
{
anchors:15,
horizontalAlignment:0,
location:"375,155",
name:"btn_cancel",
onActionMethodID:"28FD275B-2619-4899-9D9C-8FBDD8928389",
onDoubleClickMethodID:"-1",
onRightClickMethodID:"-1",
rolloverCursor:12,
showClick:false,
size:"30,30",
styleClass:"btn_cancel_40",
transparent:true,
typeid:7,
uuid:"4F7C0B26-AA82-4CA7-B4B0-44D3CDEAD051"
},
{
enabled:true,
extendsID:"00AE06D9-F4E1-4538-9FC5-A5838BAE9E60",
formIndex:0,
location:"10,120",
size:"270,20",
typeid:4,
uuid:"8D7FD1EF-4E05-4984-AC2D-1C8C58E96094"
},
{
dataProviderID:"_indirizzo",
enabled:true,
extendsID:"0E10A63F-5630-4506-A1EF-45FB70ED4C64",
typeid:4,
uuid:"90DA8E05-10EC-49DE-AF28-98D6B7D15A73"
},
{
extendsID:"0B05F3B5-CBA7-4437-A4B7-2841F4910354",
formIndex:1,
typeid:7,
uuid:"98BD5A69-E689-4C5A-A545-D52328FE9D91"
},
{
customProperties:"methods:{\
onActionMethodID:{\
arguments:[\
null,\
null,\
\"'AG_Lkp_Statoestero'\",\
null,\
null,\
null,\
null,\
null,\
\"true\"\
]\
}\
}",
enabled:false,
extendsID:"7B41BAD5-358A-4C72-9A2D-D6507435DA90",
formIndex:1,
location:"280,120",
onActionMethodID:"09683411-0331-4A08-BF5E-656611194522",
typeid:7,
uuid:"9C1CF16E-9561-46AE-9AB0-C66B1386ED80"
},
{
anchors:15,
horizontalAlignment:0,
location:"345,155",
name:"btn_save",
onActionMethodID:"C1B74558-6641-4DD6-930A-BA98E728A98E",
onDoubleClickMethodID:"-1",
onRightClickMethodID:"-1",
rolloverCursor:12,
showClick:false,
size:"30,30",
styleClass:"btn_confirm_40",
transparent:true,
typeid:7,
uuid:"A1D32092-7D26-4D37-A47B-D5F22B99E68B"
},
{
customProperties:"methods:{\
onActionMethodID:{\
arguments:[\
null,\
null,\
\"'AG_Lkp_Comune'\",\
\"'updateComune'\",\
null,\
null,\
null,\
null,\
\"true\"\
]\
}\
}",
extendsID:"0CB441E5-0DF5-4409-BAEA-BDD53FBE3BDB",
formIndex:1,
location:"280,70",
onActionMethodID:"09683411-0331-4A08-BF5E-656611194522",
styleClass:null,
typeid:7,
uuid:"B9F60151-0748-4D84-A433-620324FF37E0"
},
{
dataProviderID:"_dataDecorrenza",
extendsID:"600B9928-0DC7-47C1-A15A-A2ADE3BEB36A",
formIndex:0,
format:"dd/MM/yyyy|mask",
typeid:4,
uuid:"C234ADEC-9537-4F81-99F5-D6939AF48003"
},
{
extendsID:"5C4F3A1B-AC97-4A1A-8E44-84C12F070D3C",
location:"10,100",
typeid:7,
uuid:"C58DEB8E-929A-4CDA-AE24-AD79EAE9FDFC"
},
{
extendsID:"7F4335E2-A73C-4E10-A1F5-A74EBB30133E",
location:"350,50",
typeid:7,
uuid:"DDAE1BD7-4476-4507-9680-6595D408DD91"
},
{
dataProviderID:"_comune",
enabled:true,
extendsID:"48CA1165-A998-468B-9EF7-2AB20D7732E8",
formIndex:0,
location:"10,70",
size:"270,20",
typeid:4,
uuid:"EF373088-3E23-4F99-A46B-BA0A60EF040E"
}
],
name:"agd_indirizzo_edit",
size:"411,480",
styleName:"leaf_style",
typeid:3,
uuid:"8E8F7A7E-6A6F-49F9-838A-F3B626EC46C4"