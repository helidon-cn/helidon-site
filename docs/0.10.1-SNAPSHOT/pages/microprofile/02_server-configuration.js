<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>配置服务器</dt>
<dd slot="desc"><p>默认情况下，服务器使用MicroProfile配置，但您可能还想使用Helidon配置。</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >配置服务器</h2>
<div class="section">
<p>有3个默认的MicroProfile配置源：</p>

<ul class="ulist">
<li>
<p><code>System.getProperties()</code></p>

</li>
<li>
<p><code>System.getenv()</code></p>

</li>
<li>
<p>所有 <code>META-INF/microprofile-config.properties</code> 文件都在类路径下</p>

</li>
</ul>
<p>I在此示例中，配置位于文件中，并包含Helidon配置选项。</p>

<markup
lang="properties"
title="META-INF/microprofile-config.properties - 服务器配置"
># 默认是localhost
server.host=some.host
# 默认是7001
server.port=7011

# Helidon配置（可选）

# 传入连接的队列长度。默认值为1024
server.backlog: 512
# TCP接收窗口。默认值为0以使用实现默认值
server.receive-buffer: 256
# 套接字超时毫秒 - 默认为0（无限）
server.timeout: 30000
# 默认值为CPU_COUNT * 2
server.workers=4
# 默认关闭了SSL
ssl:
 private-key:
    keystore-resource-path: "certificate.p12"
    keystore-passphrase: "abcd"</markup>

<p>对于Helidon配置，默认文件是类路径上的 <code>application.yaml</code> （例如 src/main/resources/application.yaml）。</p>

<markup
lang="yaml"
title="application.yaml - 服务器配置"
>server:
  sockets:
    - secure:
        port: 443
        # supports all socket related properties of server
        backlog: 1024
        receive-buffer: 0
        timeout: 60000
        ssl:
          ....
    - another:
        port: 12041</markup>

</div>
</doc-view>
