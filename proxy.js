function FindProxyForURL(url, host)
{
	//if (true) return "DIRECT";

    // Proxy server in format "PROXY [proxy server]:[proxy port]"
    var proxy = "PROXY 01.proxy.danafix.net:31280";
	
    if (!isInNet(myIpAddress(), "10.99.0.0", "255.255.0.0"))
        return "DIRECT";
     
    // Proxy Exceptions:
    var exceptions = new Array(     
        /\.local$/,
        /\.dsi$/,
	/\.danafix\.id$/,
	/\.danafix\.net$/,
        /\.fineasy\.id$/,
	/\.idcloudonline\.com$/,
        /\.mfi-ap\.asia$/
    );
     
    for (i = 0; i < exceptions.length; i++) // Iterate through each exception 
    {
        if (exceptions[i].test(host)) // Test regex query against hostname
        {
            return "DIRECT"; // Bypass the proxy
        }
    }
    
    var hostIP = dnsResolve(host);
    
    if (isInNet(hostIP, '10.0.0.0', '255.0.0.0') ||
	    isInNet(hostIP, '127.0.0.0', '255.0.0.0') ||
	    isInNet(hostIP, '169.254.0.0', '255.255.0.0') ||
	    isInNet(hostIP, '172.16.0.0', '255.240.0.0') ||
	    isInNet(hostIP, '192.168.0.0', '255.255.0.0'))
    {
	    return 'DIRECT';
    }
     
    return proxy; // Connect via proxy
}
