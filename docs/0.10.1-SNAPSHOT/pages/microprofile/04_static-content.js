<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>提供静态内容</dt>
<dd slot="desc"><p>您可以从文件系统中的位置或类路径提供静态内容。</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >提供静态内容</h2>
<div class="section">
<markup
lang="properties"
title="META-INF/microprofile-config.properties - 文件系统静态内容"
># Location of content on file system
server.static.path.location=/var/www/html
# default is index.html
server.static.classpath.welcome=resource.html
# static content path - default is "/"
# server.static.classpath.context=/static-file</markup>

<markup
lang="properties"
title="META-INF/microprofile-config.properties - 类路径静态内容"
># src/main/resources/WEB in your source tree
server.static.classpath.location=/WEB
# default is index.html
server.static.classpath.welcome=resource.html
# static content path - default is "/"
# server.static.classpath.context=/static-cp</markup>

</div>
</doc-view>
