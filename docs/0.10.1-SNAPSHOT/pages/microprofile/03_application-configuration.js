<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>配置应用程序</dt>
<dd slot="desc"><p>您的应用程序可以使用MicroProfile配置或Helidon配置（或两者）。
MicroProfile Config为其他MicroProfile服务器提供了可移植性。
Helidon Config支持完整的树结构，包括重复元素。</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >配置应用程序</h2>
<div class="section">
<p>您可以从MicroProfile配置和Helidon配置中注入应用程序可以访问的值。</p>

<markup
lang="java"
title="JAX-RS - 注入一个配置属性"
>@Inject
public MyResource(@ConfigProperty(name="app.name") String appName) {
    this.applicationName = appName;
}</markup>

<p>您还可以注入整个配置实例， <code>io.helidon.config.Config</code> 或者
 <code>org.eclipse.microprofile.config.Config</code>.</p>

<markup
lang="java"
title="JAX-RS - 注入配置"
>@Inject
public MyResource(Config config) {
    this.config = config;
}</markup>

</div>
</doc-view>
