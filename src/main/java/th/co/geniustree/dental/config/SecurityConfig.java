package th.co.geniustree.dental.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import th.co.geniustree.dental.service.CustomUserService;

<<<<<<< HEAD
=======

>>>>>>> 04beba6fb643c7eba98ef958a671920bf68f8b68
/**
 * @author pramoth
 */
@Configuration
@EnableWebMvcSecurity()
<<<<<<< HEAD
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
=======
@EnableGlobalMethodSecurity(prePostEnabled = true , securedEnabled = true)
>>>>>>> 04beba6fb643c7eba98ef958a671920bf68f8b68
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserService customUserService;

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().formLogin()
                .loginPage("/pages/login.html")
                .loginProcessingUrl("/login").usernameParameter("email").passwordParameter("password")
                .defaultSuccessUrl("/index.html")
                .permitAll()
                .and()
                .logout()
                .logoutUrl("/logout")
                .deleteCookies("JSESSIONID")
<<<<<<< HEAD
                .permitAll()
                .and()
                .headers()
                .frameOptions()
                .disable()
=======
                .and()
>>>>>>> 04beba6fb643c7eba98ef958a671920bf68f8b68
                .authorizeRequests().anyRequest().authenticated();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
<<<<<<< HEAD
        web.ignoring()
                .antMatchers("/console/*")
                .antMatchers("/css/**")
                .antMatchers("/js/**")
                .antMatchers("/materialize/**");
=======
        web.ignoring().antMatchers("/console/*");
>>>>>>> 04beba6fb643c7eba98ef958a671920bf68f8b68
    }

}
