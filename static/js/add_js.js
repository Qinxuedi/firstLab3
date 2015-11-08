var flag={one:false,two:false,three:false,four:false,five:false,six:false,seven:false,eight:false}
function validate_form2(element)
{
    return flag['one'] && flag['two'] && flag['three'] && flag['four'] && flag['five'] && flag['six'] && flag['seven'] && flag['eight']; 
}
function onFocusFun(element,arg)
{
    document.getElementById(arg).innerHTML='';
}
function onblurFun(element,arg)
{
    if(element.name=='author_age')
    {
        flag['four']=false;
        if(element.value=='')
            document.getElementById(arg).innerHTML='输入不能为空!';
        else if(String(Number(element.value))=='NaN' || parseInt(element.value)<=0 || parseInt(element.value)!=parseFloat(element.value))
            document.getElementById(arg).innerHTML='非法的年龄!';
        else flag['four']=true;
    }
    if(element.name=='publish_day' || element.name=='publish_year' || element.name=='publish_month')
    {
        flag['seven']=false;
        var year=Number(document.getElementById('seven1').value);
        var month=Number(document.getElementById('seven2').value);
        var day=Number(document.getElementById('seven3').value);
        if(judge_date(year,month,day)==false)
            document.getElementById(arg).innerHTML='非法的日期!';
        else {flag['seven']=true;}
    }
    else if(element.name=='price')
    {
        flag['eight']=false;
        if(element.value=='')
            document.getElementById(arg).innerHTML='输入不能为空!';
        else if(String(Number(element.value))=='NaN' || parseFloat(element.value)<=0)
            document.getElementById(arg).innerHTML='非法的价格!';
        else flag['eight']=true;
    }
    else if(element.name=='book_ISBN')
    {
        flag['two']=false;
        if(element.value=='')
            document.getElementById('two').innerHTML='输入不能为空!';
        else
        {
            var userinput=element.value
            $.ajax({
                method:'GET',
                url:'/check_book',
                cache:false,
                dataType: 'json',
                data:{'userinput':userinput},
                success:function(result)
                {
                    if(result==1) 
                    {
                        document.getElementById('two').innerHTML='已存在的ISBN!';
                    }
                    else
                    {
                        flag['two']=true;
                    }
                },
                error:function(result)
                {
                    alert('error!')
                }
            })
        }
    }
    else if(element.name=='author_name')
    {
        flag['three']=false;
        if(element.value=='')
            document.getElementById('three').innerHTML='输入不能为空!';
        else
        {
            flag['three']=true
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
                        flag['four']=false;flag['five']=false;
                        alert('作者不存在,请输入作者信息!');
                        document.getElementById('mydiv').style.display='';
                    }
                    else
                    {
                        flag['four']=true;flag['five']=true;
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
    else
    {
        flag[arg]=false;
        if(element.value=='')
            document.getElementById(arg).innerHTML='输入不能为空!';
        else flag[arg]=true;
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
    if(flag['one'] && flag['two'] && flag['three'] && flag['four'] && flag['five'] && flag['six'] && flag['seven'] && flag['eight']) 
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
