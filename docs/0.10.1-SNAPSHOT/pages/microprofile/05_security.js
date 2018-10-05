<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>添加安全性</dt>
<dd slot="desc"><p>要向MicroProfile应用程序添加安全性（例如使用身份验证保护资源方法），
请将Helidon安全集成依赖项添加到项目中。</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Maven 坐标</h2>
<div class="section">
<markup
lang="xml"
title="Maven 依赖"
>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.microprofile&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-microprofile-security&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h3 >保护Web资源</h3>
<div class="section">
<p>有关Web服务器静态内容，请参阅 <router-link to="/microprofile/06_configuration">配置密钥.</router-link> 。</p>

<p>对于JAX-RS资源，通过向资源类或方法添加注释来声明安全性。</p>

<markup
lang="java"
title="受保护的资源方法"
>@GET
@io.helidon.security.annot.Authenticated
@io.helidon.security.annot.Authorized
// 你也可以用 io.helidon.security.abac.role.RoleValidator.Roles
@RolesAllowed("admin")
public String adminResource(@Context io.helidon.security.SecurityContext securityContext) {
  return "you are " + securityContext.getUser();
}</markup>

</div>
</div>
</doc-view>
