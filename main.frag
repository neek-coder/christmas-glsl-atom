vec3 palette(float t){
    vec3 a=vec3(.578,.598,.828);
    vec3 b=vec3(-.392,.368,-.222);
    vec3 c=vec3(2.148,1.238,1.);
    vec3 d=vec3(0.,.333,-.422);
    
    return a+b*cos(6.28318*(c*t+d));
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    const float pi=3.14159;
    float k=1.7*(sin(iTime) + 2.)/3.;
    float t=iTime;
    float b=.002;
    
    const float d=.4;
    
    vec2 uv=fragCoord/iResolution.xy*2.-1.;
    uv*=iResolution.xy/vec2(min(iResolution.x,iResolution.y));
    
    const float iters=20.;
    
    for(float i=0.;i<iters;i+=1.){
        const float offset=2.*pi/iters;
        vec2 p=vec2(cos(t+pi/k+i*offset),sin(t+pi/k-i*offset - 2.*iTime))*d;
        fragColor+=vec4(palette(t+pi/k+i*offset)*(b/length(p-uv)),1.);
    }

    for(float i=0.;i<iters;i+=1.){
        const float offset=2.*pi/iters;
        vec2 p=vec2(cos(t-pi/k+i*offset+pi/2.),sin(t-pi/k-i*offset - 2.*iTime-pi/2.))*d;
        fragColor+=vec4(palette(t+pi/k+i*offset)*(b/length(p-uv)),1.);
    }

    vec2 p=vec2(0.);
    fragColor+=vec4(palette(12.) * (20.*b/length(p-uv)),1.);
}