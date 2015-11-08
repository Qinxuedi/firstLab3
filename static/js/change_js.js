var flag1=true;var flag2=true;var flag3=true;var flag4=true;
var flag11=false;var flag12=false;var userexit=true;
function validate_form2(element)
{
    return (flag1 && flag2 && flag3 && flag4) && (userexit || (!userexit && flag11 && flag12))
}
function onFocusFun(element,id)
{
    if(element.style.color!='black')
    {
        element.value='';
        element.style.color='black';
    }
    document.getElementById(id).innerHTML='';
}
function onblurFun(element)
{
    if(element.name=='author_name')
    {
        flag1=false;
        if(element.value=='')
            document.getElementById('one').innerHTML='输入不能为空！';
        else
        {
            flag1=true
            var userinput=element.value
            $.ajax({
                method:'GET',
                url:'/check_author',
                cache:false,
                dataType: 'json',
                data:{'userinput':userinput},
                success:function(result)
                {
                    if(result==0) 
                    {
                        userexit=false
                        alert('作者不存在,请输入作者信息！');
                        document.getElementById('mydiv').style.display='';
                    }
                    else
                    {
                        userexit=true
                        document.getElementById('mydiv').style.display='none';
                    }
                },
                error:function(result)
                {
                    alert('error!')
                }
            })
        }
    }
    else if(element.name=='publisher')
    {
        flag2=false;
        if(element.value=='')
            document.getElementById('two').innerHTML='输入不能为空！';
        else flag2=true;
    }
    else if(element.name=='publish_day' || element.name=='publish_year' || element.name=='publish_month')
    {
        flag3=false;
        var year=Number(document.getElementById('three1').value);
        var month=Number(document.getElementById('three2').value);
        var day=Number(document.getElementById('three3').value);
        if(judge_date(year,month,day)==false)
            document.getElementById('three').innerHTML='非法的日期！';
        else {flag3=true;}
    }
    else if(element.name=='price')
    {
        flag4=false;
        if(element.value=='')
            document.getElementById('four').innerHTML='输入不能为空！';
        else if(String(Number(element.value))=='NaN' || parseFloat(element.value)<=0)
            document.getElementById('four').innerHTML='非法的价格！';
        else flag4=true;
    }
    else if(element.name=='author_age')
    {
        flag11=false;
        if(element.value=='')
            document.getElementById('one_age').innerHTML='输入不能为空！';
        else if(String(Number(element.value))=='NaN' || parseInt(element.value)<=0 || parseInt(element.value)!=parseFloat(element.value))
            document.getElementById('one_age').innerHTML='非法的年龄！';
        else flag11=true;
    }
    else if(element.name=='author_country')
    {
        flag12=false;
        if(element.value=='')
            document.getElementById('one_country').innerHTML='输入不能为空！';
        else flag12=true;
    }
}
function validate_required(field,alerttxt)
{
    with (field)
      {
      if (value==null||value=="")
        {alert(alerttxt);return false}
      else {return true}
      }
}
function validate_form(thisform)
{
    with (thisform)
      {
      if (validate_required(input,"输入不能为空!")==false)
        {input.focus();return false}
      }
}
function up_changeColor1(element)
{
    element.style.background='green';
}
function up_changeColor2(element)
{
    element.style.background='#98bf21';
}

function down_changeColor1(element)
{
    if((flag1 && flag2 && flag3 && flag4) && (userexit || (!userexit && flag11 && flag12))) 
        element.style.background='green';
}
function down_changeColor2(element)
{
    element.style.background='#98bf21';
}
function judge_date(year,month,day)
{
    var sign=false;
    var dayvalid;
    if(String(Number(year))=='NaN' || parseInt(year)<=0 || parseInt(year)!=parseFloat(year)) return false;
    if(String(Number(month))=='NaN' || parseInt(month)<=0 || parseInt(month)!=parseFloat(month)) return false;
    if(String(Number(day))=='NaN' || parseInt(day)<=0 || parseInt(day)!=parseFloat(day)) return false;
    if ((year%4==0&&year%100!=0)||year%400==0) sign=true;
    if(month>=1 && month<=12)
    {
        switch(month)
        {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                {dayvalid=31;break;}
            case 4:
            case 6:
            case 9:
            case 11:
                {dayvalid=30;break;}
            case 2:
                if(sign==1) dayvalid=29;
                else dayvalid=28;
                break;
            default:break;
        }
        if(day>0 && day<=dayvalid) return true;
    }
    return false;
}