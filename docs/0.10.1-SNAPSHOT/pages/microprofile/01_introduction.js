<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Microprofile 介绍</dt>
<dd slot="desc"><p>MicroProfile是Java EE开发人员熟悉的平台定义。如果您有使用JAX-RS，JSON-P和CDI的经验，则可能更喜欢使用此模型。</p>

<p>要扩展MicroProfile应用程序的功能，您可能还决定使用Helidon核心API，尤其是配置和安全性。</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Helidon MicroProfile入门</h2>
<div class="section">
<p>开始使用MicroProfile应用程序，需要完成以下任务：</p>


<h3 >Maven 依赖</h3>
<div class="section">
<p>在项目中声明以下依赖项：</p>

<markup
lang="xml"
title="Maven 依赖"
>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.microprofile.bundles&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-microprofile-1.1&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h3 >项目文件</h3>
<div class="section">
<p>使用至少一个资源方法创建JAX-RS Resource类。</p>

<markup
lang="java"
title="JAX-RS 资源类举例"
>@Path("/")
@RequestScoped
public class HelloWorldResource {
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String message() {
        return "Hello World";
    }
}</markup>

<p>并创建一个JAX-RS应用程序</p>

<markup
lang="java"
title="JAX-RS Application举例"
>@ApplicationScoped
@ApplicationPath("/")
public class HelloWorldApplication extends Application {
    @Override
    public Set&lt;Class&lt;?&gt;&gt; getClasses() {
        return Set.of(
                HelloWorldResource.class
        );
    }
}</markup>

<p>在 <code>src/main/resources/META-INF</code> 中添加 <code>beans.xml</code> ，以便CDI实现可以获取您的类。</p>

<markup
lang="xml"
title="beans.xml"
>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans/&gt;</markup>

<p>最后一步，在应用程序（或专用的Main类）中添加一个main方法来启动所有操作。</p>

<markup
lang="java"
title="JAX-RS 应用举例"
>public static void main(String[] args) {
    io.helidon.microprofile.server.Main.main(args);
}</markup>

<p>运行主类。服务器将从端口7001启动并为您的资源提供服务。</p>

</div>

<h3 >添加 Jandex</h3>
<div class="section">
<p>Jandex是Weld（CDI实现）的索引工具，有助于加快应用程序的启动时间。</p>

<p>要使用Jandex，请配置一个Maven插件，该插件将索引添加到JAR文件并依赖于Jandex。</p>

<markup
lang="xml"
title="jandex 依赖"
>&lt;dependency&gt;
    &lt;groupId&gt;org.jboss&lt;/groupId&gt;
    &lt;artifactId&gt;jandex&lt;/artifactId&gt;
    &lt;version&gt;2.0.4.Final&lt;/version&gt;
&lt;/dependency&gt;</markup>

<markup
lang="xml"
title="jandex 插件配置"
>&lt;build&gt;
    &lt;plugins&gt;
        &lt;plugin&gt;
            &lt;groupId&gt;org.jboss.jandex&lt;/groupId&gt;
            &lt;artifactId&gt;jandex-maven-plugin&lt;/artifactId&gt;
            &lt;version&gt;1.0.5&lt;/version&gt;
            &lt;executions&gt;
                &lt;execution&gt;
                    &lt;id&gt;make-index&lt;/id&gt;
                    &lt;goals&gt;
                        &lt;goal&gt;jandex&lt;/goal&gt;
                    &lt;/goals&gt;
                    &lt;phase&gt;process-classes&lt;/phase&gt;
                &lt;/execution&gt;
            &lt;/executions&gt;
        &lt;/plugin&gt;
    &lt;/plugins&gt;
&lt;/build&gt;</markup>

</div>
</div>
</doc-view>
